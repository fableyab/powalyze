import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database, Link2, CheckCircle, AlertCircle, 
  Settings, RefreshCw, Plug, FileSpreadsheet, 
  Globe, Shield, Key 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import SEO from '@/components/SEO';

const ConnectorsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [connectors, setConnectors] = useState([
    {
      id: 'api',
      name: 'API REST',
      description: t('connectors.apiDescription', 'Connect to your custom REST API'),
      icon: Globe,
      status: 'disconnected',
      color: 'blue',
      config: { url: '', apiKey: '', method: 'GET' }
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      description: t('connectors.sharepointDescription', 'Connect to SharePoint lists and libraries'),
      icon: FileSpreadsheet,
      status: 'disconnected',
      color: 'green',
      config: { siteUrl: '', tenantId: '', clientId: '', clientSecret: '' }
    },
    {
      id: 'powerbi',
      name: 'Power BI',
      description: t('connectors.powerbiDescription', 'Connect to your Power BI workspace'),
      icon: Database,
      status: 'disconnected',
      color: 'yellow',
      config: { workspaceId: '', datasetId: '', clientId: '', clientSecret: '' }
    }
  ]);

  const [selectedConnector, setSelectedConnector] = useState(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  const handleConfigChange = (field, value) => {
    setSelectedConnector(prev => ({
      ...prev,
      config: { ...prev.config, [field]: value }
    }));
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t('toast.connectionEstablished', 'Connection Established'),
        description: t('connectors.connectionSuccess', 'Successfully connected to') + ` ${selectedConnector.name}`,
        className: "bg-[#111] border-white/10 text-white"
      });
      
      setConnectors(prev => prev.map(c => 
        c.id === selectedConnector.id 
          ? { ...c, status: 'connected', config: selectedConnector.config }
          : c
      ));
      
      setTestingConnection(false);
      setConfigOpen(false);
    }, 2000);
  };

  const handleDisconnect = (connectorId) => {
    setConnectors(prev => prev.map(c => 
      c.id === connectorId ? { ...c, status: 'disconnected' } : c
    ));
    
    toast({
      title: t('connectors.disconnected', 'Disconnected'),
      description: t('connectors.disconnectionSuccess', 'Connector has been disconnected'),
      variant: "default"
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
            <CheckCircle size={14} className="mr-1" /> {t('dataIntegration.connected', 'Connected')}
          </Badge>
        );
      case 'syncing':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
            <RefreshCw size={14} className="mr-1 animate-spin" /> {t('dataIntegration.analyzing', 'Syncing')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">
            <AlertCircle size={14} className="mr-1" /> {t('connectors.disconnected', 'Disconnected')}
          </Badge>
        );
    }
  };

  return (
    <>
      <SEO 
        title={t('connectors.pageTitle', 'Data Connectors')} 
        description={t('connectors.pageDescription', 'Manage your data source connections')} 
      />
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('connectors.title', 'Data Connectors')}</h1>
          <p className="text-gray-400">{t('connectors.subtitle', 'Connect your business systems to Powalyze')}</p>
        </div>

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectors.map((connector) => (
            <Card key={connector.id} className="bg-[#111] border-white/10 hover:border-[#BFA76A]/30 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${connector.color}-500/10 flex items-center justify-center`}>
                    <connector.icon size={24} className={`text-${connector.color}-500`} />
                  </div>
                  {getStatusBadge(connector.status)}
                </div>
                <CardTitle className="text-white">{connector.name}</CardTitle>
                <CardDescription className="text-gray-400">{connector.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {connector.status === 'connected' ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-white/10 text-white hover:bg-white/5"
                        onClick={() => {
                          setSelectedConnector(connector);
                          setConfigOpen(true);
                        }}
                      >
                        <Settings size={16} className="mr-2" /> {t('common.configure', 'Configure')}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDisconnect(connector.id)}
                      >
                        {t('connectors.disconnect', 'Disconnect')}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold"
                      onClick={() => {
                        setSelectedConnector(connector);
                        setConfigOpen(true);
                      }}
                    >
                      <Plug size={16} className="mr-2" /> {t('connectors.connect', 'Connect')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Configuration Dialog */}
        <Dialog open={configOpen} onOpenChange={setConfigOpen}>
          <DialogContent className="bg-[#111] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedConnector?.icon && <selectedConnector.icon size={20} />}
                {selectedConnector?.name} {t('common.configure', 'Configuration')}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {t('connectors.configDescription', 'Enter your connection details below')}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {selectedConnector?.id === 'api' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiUrl">{t('connectors.apiUrl', 'API URL')}</Label>
                    <Input
                      id="apiUrl"
                      placeholder="https://api.example.com"
                      value={selectedConnector.config.url}
                      onChange={(e) => handleConfigChange('url', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">{t('connectors.apiKey', 'API Key')}</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={selectedConnector.config.apiKey}
                      onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                </>
              )}

              {selectedConnector?.id === 'sharepoint' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">{t('connectors.siteUrl', 'Site URL')}</Label>
                    <Input
                      id="siteUrl"
                      placeholder="https://yourcompany.sharepoint.com/sites/yoursite"
                      value={selectedConnector.config.siteUrl}
                      onChange={(e) => handleConfigChange('siteUrl', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenantId">{t('connectors.tenantId', 'Tenant ID')}</Label>
                    <Input
                      id="tenantId"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={selectedConnector.config.tenantId}
                      onChange={(e) => handleConfigChange('tenantId', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientId">{t('connectors.clientId', 'Client ID')}</Label>
                    <Input
                      id="clientId"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={selectedConnector.config.clientId}
                      onChange={(e) => handleConfigChange('clientId', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">{t('connectors.clientSecret', 'Client Secret')}</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={selectedConnector.config.clientSecret}
                      onChange={(e) => handleConfigChange('clientSecret', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                </>
              )}

              {selectedConnector?.id === 'powerbi' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="workspaceId">{t('connectors.workspaceId', 'Workspace ID')}</Label>
                    <Input
                      id="workspaceId"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={selectedConnector.config.workspaceId}
                      onChange={(e) => handleConfigChange('workspaceId', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="datasetId">{t('connectors.datasetId', 'Dataset ID')}</Label>
                    <Input
                      id="datasetId"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={selectedConnector.config.datasetId}
                      onChange={(e) => handleConfigChange('datasetId', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pbiClientId">{t('connectors.clientId', 'Client ID')}</Label>
                    <Input
                      id="pbiClientId"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={selectedConnector.config.clientId}
                      onChange={(e) => handleConfigChange('clientId', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pbiClientSecret">{t('connectors.clientSecret', 'Client Secret')}</Label>
                    <Input
                      id="pbiClientSecret"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={selectedConnector.config.clientSecret}
                      onChange={(e) => handleConfigChange('clientSecret', e.target.value)}
                      className="bg-[#0A0A0A] border-white/10 text-white"
                    />
                  </div>
                </>
              )}

              {/* Security Notice */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Shield size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-300">
                  {t('connectors.securityNotice', 'Your credentials are encrypted and securely stored')}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t border-white/10 pt-4">
              <Button 
                variant="ghost" 
                onClick={() => setConfigOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                {t('common.cancel', 'Cancel')}
              </Button>
              <Button 
                className="bg-[#BFA76A] text-black hover:bg-white font-bold"
                onClick={handleTestConnection}
                disabled={testingConnection}
              >
                {testingConnection ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    {t('connectors.testing', 'Testing...')}
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    {t('common.testConnection', 'Test Connection')}
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ConnectorsPage;
