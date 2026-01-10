# Power BI Embed API - Backend

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy example file
cp .env.example .env

# Edit .env with your Azure AD and Power BI credentials
```

### 3. Start Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:3001**

---

## 🔧 Azure AD App Setup

### Step 1: Create Azure AD App
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
   - Name: `Powalyze Power BI Embed`
   - Supported account types: Single tenant
   - Click **Register**

### Step 2: Get Credentials
1. Copy **Application (client) ID** → `PBI_CLIENT_ID`
2. Copy **Directory (tenant) ID** → `PBI_TENANT_ID`
3. Go to **Certificates & secrets**
4. Click **New client secret**
   - Description: `PowerBI API Key`
   - Expires: 24 months
5. Copy the **Value** → `PBI_CLIENT_SECRET`

### Step 3: Configure API Permissions
1. Go to **API permissions**
2. Click **Add a permission** > **Power BI Service**
3. Select **Delegated permissions**:
   - ✅ `Report.Read.All`
   - ✅ `Dataset.Read.All`  
   - ✅ `Workspace.Read.All`
4. Click **Grant admin consent** (requires admin)

---

## 📊 Power BI Workspace Setup

### Step 1: Get Workspace ID
1. Open [Power BI](https://app.powerbi.com)
2. Navigate to your workspace
3. Copy ID from URL: `https://app.powerbi.com/groups/WORKSPACE_ID/...`
4. Save as `PBI_WORKSPACE_ID`

### Step 2: Add App to Workspace
1. In Power BI workspace, click **Access**
2. Click **Add user/group**
3. Search for your app name (`Powalyze Power BI Embed`)
4. Select role: **Member** or **Admin**
5. Click **Add**

### Step 3: Get Report IDs
For each report you want to embed:
1. Open report in Power BI
2. Copy ID from URL: `https://app.powerbi.com/.../reports/REPORT_ID/...`
3. Map to environment variable:
   - Commercial → `PBI_REPORT_COMMERCIAL`
   - Finance → `PBI_REPORT_FINANCE`
   - PMO → `PBI_REPORT_PMO`
   - Predictive → `PBI_REPORT_PREDICTIVE`
   - Operational → `PBI_REPORT_OPERATIONAL`
   - Strategic → `PBI_REPORT_STRATEGIC`

---

## 🌐 API Endpoints

### POST `/api/powerbi/embed`
Generate embed token for a report.

**Request:**
```json
{
  "reportType": "commercial",
  "userId": "user123",
  "userEmail": "user@company.com",
  "userRoles": ["Sales"]
}
```

**Response:**
```json
{
  "embedUrl": "https://app.powerbi.com/reportEmbed?...",
  "accessToken": "H4sIAAAAAAAEAB2...",
  "reportId": "abc-123-def",
  "reportName": "Commercial Report",
  "tokenType": "Embed",
  "expiresAt": "2024-01-15T10:30:00Z"
}
```

**Report Types:**
- `commercial` - Commercial performance
- `finance` - Financial analysis
- `pmo` - Project management
- `predictive` - Predictive analytics
- `operational` - Operational metrics
- `strategic` - Strategic overview

### GET `/api/powerbi/reports`
List all configured reports.

**Response:**
```json
{
  "reports": [
    {
      "type": "commercial",
      "name": "Commercial Report",
      "configured": true
    }
  ],
  "total": 6
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "configured": true,
  "timestamp": "2024-01-15T09:00:00Z",
  "reports": 6
}
```

---

## 🔒 Row-Level Security (RLS)

To enable user-specific data filtering, pass `userEmail` and `userRoles`:

```javascript
// Frontend request
const response = await fetch('/api/powerbi/embed', {
  method: 'POST',
  body: JSON.stringify({
    reportType: 'commercial',
    userEmail: 'john@company.com',
    userRoles: ['Sales', 'Manager']
  })
});
```

The API will automatically apply RLS based on:
- **Username**: User's email
- **Roles**: User's roles in your system
- **Datasets**: All datasets in the report

**Note:** RLS must be configured in Power BI Desktop first.

---

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:3001/health
```

### Test Token Generation
```bash
curl -X POST http://localhost:3001/api/powerbi/embed \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "commercial",
    "userEmail": "test@powalyze.com"
  }'
```

### Test from Frontend
```javascript
// Development (uses mock tokens)
// Just load http://localhost:5173/app/powerbi?report=commercial

// Production (uses real tokens)
// 1. Set VITE_PBI_API_URL=http://localhost:3001 in .env
// 2. Restart Vite dev server
// 3. Load http://localhost:5173/app/powerbi?report=commercial
```

---

## 🚨 Troubleshooting

### 401 Unauthorized
- ✅ Check Azure AD credentials in `.env`
- ✅ Verify client secret hasn't expired
- ✅ Check API permissions granted

### 404 Report Not Found
- ✅ Verify report ID in `.env`
- ✅ Check workspace ID is correct
- ✅ Ensure app has workspace access

### CORS Errors
- ✅ Check `FRONTEND_URL` in `.env`
- ✅ Verify frontend is running on correct port
- ✅ Check browser console for details

### Token Expired
- Tokens expire after 1 hour
- Frontend should call `/api/powerbi/embed` again
- Implement auto-refresh 5 minutes before expiration

---

## 📦 Production Deployment

### Option 1: VPS with PM2
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name powerbi-api

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

### Option 3: Azure Functions
Convert to serverless Azure Function for better integration.

---

## 🔐 Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Rotate secrets regularly** - Every 6-12 months
3. **Use HTTPS in production** - Configure SSL/TLS
4. **Implement rate limiting** - Prevent abuse
5. **Add JWT authentication** - Verify frontend requests
6. **Monitor API usage** - Track token generation
7. **Cache tokens** - Reduce Azure AD calls

---

## 📊 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PBI_TENANT_ID` | ✅ | Azure AD tenant ID |
| `PBI_CLIENT_ID` | ✅ | Azure AD app client ID |
| `PBI_CLIENT_SECRET` | ✅ | Azure AD app secret |
| `PBI_WORKSPACE_ID` | ✅ | Power BI workspace ID |
| `PBI_REPORT_COMMERCIAL` | ✅ | Commercial report ID |
| `PBI_REPORT_FINANCE` | ✅ | Finance report ID |
| `PBI_REPORT_PMO` | ✅ | PMO report ID |
| `PBI_REPORT_PREDICTIVE` | ✅ | Predictive report ID |
| `PBI_REPORT_OPERATIONAL` | ✅ | Operational report ID |
| `PBI_REPORT_STRATEGIC` | ✅ | Strategic report ID |
| `PORT` | ❌ | Server port (default: 3001) |
| `NODE_ENV` | ❌ | Environment (development/production) |
| `FRONTEND_URL` | ❌ | Frontend URL for CORS |

---

## 📚 Additional Resources

- [Power BI Embedded Documentation](https://learn.microsoft.com/power-bi/developer/embedded/)
- [Azure AD App Registration](https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app)
- [Power BI REST API](https://learn.microsoft.com/rest/api/power-bi/)
- [Row-Level Security](https://learn.microsoft.com/power-bi/admin/service-admin-rls)

---

## 🆘 Support

For issues or questions:
- Check logs in `server.js` (detailed emoji logging)
- Review Azure AD app permissions
- Verify Power BI workspace access
- Test endpoints with curl/Postman
- Check frontend console for errors
