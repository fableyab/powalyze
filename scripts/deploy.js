#!/usr/bin/env node

/**
 * Automated Deployment Script for Powalyze
 * Handles build verification and Vercel deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  step: (msg) => console.log(`${colors.cyan}▶${colors.reset} ${msg}`)
};

const exec = (command, options = {}) => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit', ...options });
  } catch (error) {
    log.error(`Command failed: ${command}`);
    throw error;
  }
};

const checkPrerequisites = () => {
  log.step('Checking prerequisites...');
  
  // Check Node version
  const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1];
  if (parseFloat(nodeVersion) < 18) {
    log.error(`Node.js version 18+ required. Current: ${nodeVersion}`);
    process.exit(1);
  }
  log.success(`Node.js version: ${nodeVersion}`);

  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    log.success('Vercel CLI installed');
  } catch {
    log.warning('Vercel CLI not found. Installing...');
    exec('npm install -g vercel');
  }

  // Check if git is clean (optional warning)
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus.trim()) {
      log.warning('You have uncommitted changes. Consider committing before deploying.');
    }
  } catch {
    log.info('Not a git repository or git not available');
  }
};

const buildProject = () => {
  log.step('Building project...');
  
  // Clean previous build
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    log.info('Cleaned previous build');
  }

  // Run build
  exec('npm run build');
  
  // Verify build output
  if (!fs.existsSync('dist') || !fs.existsSync('dist/index.html')) {
    log.error('Build failed: dist/index.html not found');
    process.exit(1);
  }
  
  log.success('Build completed successfully');
};

const verifyBuildSize = () => {
  log.step('Analyzing build...');
  
  const getDirectorySize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stat.size;
      }
    }
    
    return size;
  };

  const size = getDirectorySize('dist');
  const sizeMB = (size / (1024 * 1024)).toFixed(2);
  
  log.info(`Build size: ${sizeMB} MB`);
  
  if (size > 50 * 1024 * 1024) {
    log.warning('Build size exceeds 50 MB. Consider optimizing assets.');
  }
};

const deployToVercel = (production = false) => {
  log.step(`Deploying to Vercel ${production ? '(Production)' : '(Preview)'}...`);
  
  const command = production ? 'vercel --prod' : 'vercel';
  
  try {
    exec(command);
    log.success('Deployment completed!');
  } catch (error) {
    log.error('Deployment failed');
    process.exit(1);
  }
};

const main = () => {
  console.log(`\n${colors.cyan}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   Powalyze Deployment Script         ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════╝${colors.reset}\n`);

  const args = process.argv.slice(2);
  const isProduction = args.includes('--prod') || args.includes('-p');
  const skipBuild = args.includes('--skip-build');
  const force = args.includes('--force');

  try {
    checkPrerequisites();
    
    if (!skipBuild) {
      buildProject();
      verifyBuildSize();
    } else {
      log.warning('Skipping build (--skip-build flag)');
    }
    
    // Guardrail: prevent accidental production deployments unless explicitly allowed
    if (isProduction) {
      const allowEnv = process.env.ALLOW_PROD_DEPLOY === 'true';
      const lockFilePath = path.join(process.cwd(), '.prod-lock');
      const lockFileExists = fs.existsSync(lockFilePath);

      if (!force && (!allowEnv || lockFileExists)) {
        log.error('Production deployment is locked for safety.');
        if (lockFileExists) {
          log.warning('A .prod-lock file is present in the repository root. Remove it to allow production deploys.');
        }
        log.info('To override intentionally, either:');
        log.info(' - run with the --force flag, or');
        log.info(' - set environment variable ALLOW_PROD_DEPLOY=true for this command');
        log.info('Example (PowerShell): $env:ALLOW_PROD_DEPLOY="true"; npm run deploy:prod');
        process.exit(1);
      }
    }

    deployToVercel(isProduction);
    
    console.log(`\n${colors.green}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}  Deployment successful! 🚀${colors.reset}`);
    console.log(`${colors.green}═══════════════════════════════════════${colors.reset}\n`);
    
  } catch (error) {
    console.log(`\n${colors.red}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.red}  Deployment failed ❌${colors.reset}`);
    console.log(`${colors.red}═══════════════════════════════════════${colors.reset}\n`);
    process.exit(1);
  }
};

main();
