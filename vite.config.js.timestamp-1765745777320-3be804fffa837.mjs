// vite.config.js
import path3 from "node:path";
import react from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createLogger, defineConfig } from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/vite/dist/node/index.js";

// plugins/visual-editor/vite-plugin-react-inline-editor.js
import path2 from "path";
import { parse as parse2 } from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/parser/lib/index.js";
import traverseBabel2 from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/traverse/lib/index.js";
import * as t from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/types/lib/index.js";
import fs2 from "fs";

// plugins/utils/ast-utils.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import generate from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/generator/lib/index.js";
import { parse } from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/parser/lib/index.js";
import traverseBabel from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/traverse/lib/index.js";
import {
  isJSXIdentifier,
  isJSXMemberExpression
} from "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/node_modules/@babel/types/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/plugins/utils/ast-utils.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname2 = path.dirname(__filename);
var VITE_PROJECT_ROOT = path.resolve(__dirname2, "../..");
function validateFilePath(filePath) {
  if (!filePath) {
    return { isValid: false, error: "Missing filePath" };
  }
  const absoluteFilePath = path.resolve(VITE_PROJECT_ROOT, filePath);
  if (filePath.includes("..") || !absoluteFilePath.startsWith(VITE_PROJECT_ROOT) || absoluteFilePath.includes("node_modules")) {
    return { isValid: false, error: "Invalid path" };
  }
  if (!fs.existsSync(absoluteFilePath)) {
    return { isValid: false, error: "File not found" };
  }
  return { isValid: true, absolutePath: absoluteFilePath };
}
function parseFileToAST(absoluteFilePath) {
  const content = fs.readFileSync(absoluteFilePath, "utf-8");
  return parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
    errorRecovery: true
  });
}
function findJSXElementAtPosition(ast, line, column) {
  let targetNodePath = null;
  let closestNodePath = null;
  let closestDistance = Infinity;
  const allNodesOnLine = [];
  const visitor = {
    JSXOpeningElement(path4) {
      const node = path4.node;
      if (node.loc) {
        if (node.loc.start.line === line && Math.abs(node.loc.start.column - column) <= 1) {
          targetNodePath = path4;
          path4.stop();
          return;
        }
        if (node.loc.start.line === line) {
          allNodesOnLine.push({
            path: path4,
            column: node.loc.start.column,
            distance: Math.abs(node.loc.start.column - column)
          });
        }
        if (node.loc.start.line === line) {
          const distance = Math.abs(node.loc.start.column - column);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestNodePath = path4;
          }
        }
      }
    },
    // Also check JSXElement nodes that contain the position
    JSXElement(path4) {
      var _a;
      const node = path4.node;
      if (!node.loc) {
        return;
      }
      if (node.loc.start.line > line || node.loc.end.line < line) {
        return;
      }
      if (!((_a = path4.node.openingElement) == null ? void 0 : _a.loc)) {
        return;
      }
      const openingLine = path4.node.openingElement.loc.start.line;
      const openingCol = path4.node.openingElement.loc.start.column;
      if (openingLine === line) {
        const distance = Math.abs(openingCol - column);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNodePath = path4.get("openingElement");
        }
        return;
      }
      if (openingLine < line) {
        const distance = (line - openingLine) * 100;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNodePath = path4.get("openingElement");
        }
      }
    }
  };
  traverseBabel.default(ast, visitor);
  const threshold = closestDistance < 100 ? 50 : 500;
  return targetNodePath || (closestDistance <= threshold ? closestNodePath : null);
}
function generateCode(node, options = {}) {
  const generateFunction = generate.default || generate;
  const output = generateFunction(node, options);
  return output.code;
}
function generateSourceWithMap(ast, sourceFileName, originalCode) {
  const generateFunction = generate.default || generate;
  return generateFunction(ast, {
    sourceMaps: true,
    sourceFileName
  }, originalCode);
}

// plugins/visual-editor/vite-plugin-react-inline-editor.js
var EDITABLE_HTML_TAGS = ["a", "Button", "button", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "Label", "img"];
function parseEditId(editId) {
  const parts = editId.split(":");
  if (parts.length < 3) {
    return null;
  }
  const column = parseInt(parts.at(-1), 10);
  const line = parseInt(parts.at(-2), 10);
  const filePath = parts.slice(0, -2).join(":");
  if (!filePath || isNaN(line) || isNaN(column)) {
    return null;
  }
  return { filePath, line, column };
}
function checkTagNameEditable(openingElementNode, editableTagsList) {
  if (!openingElementNode || !openingElementNode.name)
    return false;
  const nameNode = openingElementNode.name;
  if (nameNode.type === "JSXIdentifier" && editableTagsList.includes(nameNode.name)) {
    return true;
  }
  if (nameNode.type === "JSXMemberExpression" && nameNode.property && nameNode.property.type === "JSXIdentifier" && editableTagsList.includes(nameNode.property.name)) {
    return true;
  }
  return false;
}
function validateImageSrc(openingNode) {
  if (!openingNode || !openingNode.name || openingNode.name.name !== "img") {
    return { isValid: true, reason: null };
  }
  const hasPropsSpread = openingNode.attributes.some(
    (attr) => t.isJSXSpreadAttribute(attr) && attr.argument && t.isIdentifier(attr.argument) && attr.argument.name === "props"
  );
  if (hasPropsSpread) {
    return { isValid: false, reason: "props-spread" };
  }
  const srcAttr = openingNode.attributes.find(
    (attr) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "src"
  );
  if (!srcAttr) {
    return { isValid: false, reason: "missing-src" };
  }
  if (!t.isStringLiteral(srcAttr.value)) {
    return { isValid: false, reason: "dynamic-src" };
  }
  if (!srcAttr.value.value || srcAttr.value.value.trim() === "") {
    return { isValid: false, reason: "empty-src" };
  }
  return { isValid: true, reason: null };
}
function inlineEditPlugin() {
  return {
    name: "vite-inline-edit-plugin",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id) || !id.startsWith(VITE_PROJECT_ROOT) || id.includes("node_modules")) {
        return null;
      }
      const relativeFilePath = path2.relative(VITE_PROJECT_ROOT, id);
      const webRelativeFilePath = relativeFilePath.split(path2.sep).join("/");
      try {
        const babelAst = parse2(code, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
          errorRecovery: true
        });
        let attributesAdded = 0;
        traverseBabel2.default(babelAst, {
          enter(path4) {
            if (path4.isJSXOpeningElement()) {
              const openingNode = path4.node;
              const elementNode = path4.parentPath.node;
              if (!openingNode.loc) {
                return;
              }
              const alreadyHasId = openingNode.attributes.some(
                (attr) => t.isJSXAttribute(attr) && attr.name.name === "data-edit-id"
              );
              if (alreadyHasId) {
                return;
              }
              const isCurrentElementEditable = checkTagNameEditable(openingNode, EDITABLE_HTML_TAGS);
              if (!isCurrentElementEditable) {
                return;
              }
              const imageValidation = validateImageSrc(openingNode);
              if (!imageValidation.isValid) {
                const disabledAttribute = t.jsxAttribute(
                  t.jsxIdentifier("data-edit-disabled"),
                  t.stringLiteral("true")
                );
                openingNode.attributes.push(disabledAttribute);
                attributesAdded++;
                return;
              }
              let shouldBeDisabledDueToChildren = false;
              if (t.isJSXElement(elementNode) && elementNode.children) {
                const hasPropsSpread = openingNode.attributes.some(
                  (attr) => t.isJSXSpreadAttribute(attr) && attr.argument && t.isIdentifier(attr.argument) && attr.argument.name === "props"
                );
                const hasDynamicChild = elementNode.children.some(
                  (child) => t.isJSXExpressionContainer(child)
                );
                if (hasDynamicChild || hasPropsSpread) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (!shouldBeDisabledDueToChildren && t.isJSXElement(elementNode) && elementNode.children) {
                const hasEditableJsxChild = elementNode.children.some((child) => {
                  if (t.isJSXElement(child)) {
                    return checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS);
                  }
                  return false;
                });
                if (hasEditableJsxChild) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (shouldBeDisabledDueToChildren) {
                const disabledAttribute = t.jsxAttribute(
                  t.jsxIdentifier("data-edit-disabled"),
                  t.stringLiteral("true")
                );
                openingNode.attributes.push(disabledAttribute);
                attributesAdded++;
                return;
              }
              if (t.isJSXElement(elementNode) && elementNode.children && elementNode.children.length > 0) {
                let hasNonEditableJsxChild = false;
                for (const child of elementNode.children) {
                  if (t.isJSXElement(child)) {
                    if (!checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS)) {
                      hasNonEditableJsxChild = true;
                      break;
                    }
                  }
                }
                if (hasNonEditableJsxChild) {
                  const disabledAttribute = t.jsxAttribute(
                    t.jsxIdentifier("data-edit-disabled"),
                    t.stringLiteral("true")
                  );
                  openingNode.attributes.push(disabledAttribute);
                  attributesAdded++;
                  return;
                }
              }
              let currentAncestorCandidatePath = path4.parentPath.parentPath;
              while (currentAncestorCandidatePath) {
                const ancestorJsxElementPath = currentAncestorCandidatePath.isJSXElement() ? currentAncestorCandidatePath : currentAncestorCandidatePath.findParent((p) => p.isJSXElement());
                if (!ancestorJsxElementPath) {
                  break;
                }
                if (checkTagNameEditable(ancestorJsxElementPath.node.openingElement, EDITABLE_HTML_TAGS)) {
                  return;
                }
                currentAncestorCandidatePath = ancestorJsxElementPath.parentPath;
              }
              const line = openingNode.loc.start.line;
              const column = openingNode.loc.start.column + 1;
              const editId = `${webRelativeFilePath}:${line}:${column}`;
              const idAttribute = t.jsxAttribute(
                t.jsxIdentifier("data-edit-id"),
                t.stringLiteral(editId)
              );
              openingNode.attributes.push(idAttribute);
              attributesAdded++;
            }
          }
        });
        if (attributesAdded > 0) {
          const output = generateSourceWithMap(babelAst, webRelativeFilePath, code);
          return { code: output.code, map: output.map };
        }
        return null;
      } catch (error) {
        console.error(`[vite][visual-editor] Error transforming ${id}:`, error);
        return null;
      }
    },
    // Updates source code based on the changes received from the client
    configureServer(server) {
      server.middlewares.use("/api/apply-edit", async (req, res, next) => {
        if (req.method !== "POST")
          return next();
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          var _a;
          let absoluteFilePath = "";
          try {
            const { editId, newFullText } = JSON.parse(body);
            if (!editId || typeof newFullText === "undefined") {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Missing editId or newFullText" }));
            }
            const parsedId = parseEditId(editId);
            if (!parsedId) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid editId format (filePath:line:column)" }));
            }
            const { filePath, line, column } = parsedId;
            const validation = validateFilePath(filePath);
            if (!validation.isValid) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: validation.error }));
            }
            absoluteFilePath = validation.absolutePath;
            const originalContent = fs2.readFileSync(absoluteFilePath, "utf-8");
            const babelAst = parseFileToAST(absoluteFilePath);
            const targetNodePath = findJSXElementAtPosition(babelAst, line, column + 1);
            if (!targetNodePath) {
              res.writeHead(404, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Target node not found by line/column", editId }));
            }
            const targetOpeningElement = targetNodePath.node;
            const parentElementNode = (_a = targetNodePath.parentPath) == null ? void 0 : _a.node;
            const isImageElement = targetOpeningElement.name && targetOpeningElement.name.name === "img";
            let beforeCode = "";
            let afterCode = "";
            let modified = false;
            if (isImageElement) {
              beforeCode = generateCode(targetOpeningElement);
              const srcAttr = targetOpeningElement.attributes.find(
                (attr) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "src"
              );
              if (srcAttr && t.isStringLiteral(srcAttr.value)) {
                srcAttr.value = t.stringLiteral(newFullText);
                modified = true;
                afterCode = generateCode(targetOpeningElement);
              }
            } else {
              if (parentElementNode && t.isJSXElement(parentElementNode)) {
                beforeCode = generateCode(parentElementNode);
                parentElementNode.children = [];
                if (newFullText && newFullText.trim() !== "") {
                  const newTextNode = t.jsxText(newFullText);
                  parentElementNode.children.push(newTextNode);
                }
                modified = true;
                afterCode = generateCode(parentElementNode);
              }
            }
            if (!modified) {
              res.writeHead(409, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Could not apply changes to AST." }));
            }
            const webRelativeFilePath = path2.relative(VITE_PROJECT_ROOT, absoluteFilePath).split(path2.sep).join("/");
            const output = generateSourceWithMap(babelAst, webRelativeFilePath, originalContent);
            const newContent = output.code;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: true,
              newFileContent: newContent,
              beforeCode,
              afterCode
            }));
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error during edit application." }));
          }
        });
      });
    }
  };
}

// plugins/visual-editor/vite-plugin-edit-mode.js
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// plugins/visual-editor/visual-editor-config.js
var EDIT_MODE_STYLES = `
	#root[data-edit-mode-enabled="true"] [data-edit-id] {
		cursor: pointer; 
		outline: 2px dashed #357DF9; 
		outline-offset: 2px;
		min-height: 1em;
	}
	#root[data-edit-mode-enabled="true"] img[data-edit-id] {
		outline-offset: -2px;
	}
	#root[data-edit-mode-enabled="true"] {
		cursor: pointer;
	}
	#root[data-edit-mode-enabled="true"] [data-edit-id]:hover {
		background-color: #357DF933;
		outline-color: #357DF9; 
	}

	@keyframes fadeInTooltip {
		from {
			opacity: 0;
			transform: translateY(5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	#inline-editor-disabled-tooltip {
		display: none; 
		opacity: 0; 
		position: absolute;
		background-color: #1D1E20;
		color: white;
		padding: 4px 8px;
		border-radius: 8px;
		z-index: 10001;
		font-size: 14px;
		border: 1px solid #3B3D4A;
		max-width: 184px;
		text-align: center;
	}

	#inline-editor-disabled-tooltip.tooltip-active {
		display: block;
		animation: fadeInTooltip 0.2s ease-out forwards;
	}
`;

// plugins/visual-editor/vite-plugin-edit-mode.js
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/plugins/visual-editor/vite-plugin-edit-mode.js";
var __filename2 = fileURLToPath2(__vite_injected_original_import_meta_url2);
var __dirname3 = resolve(__filename2, "..");
function inlineEditDevPlugin() {
  return {
    name: "vite:inline-edit-dev",
    apply: "serve",
    transformIndexHtml() {
      const scriptPath = resolve(__dirname3, "edit-mode-script.js");
      const scriptContent = readFileSync(scriptPath, "utf-8");
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: scriptContent,
          injectTo: "body"
        },
        {
          tag: "style",
          children: EDIT_MODE_STYLES,
          injectTo: "head"
        }
      ];
    }
  };
}

// plugins/vite-plugin-iframe-route-restoration.js
function iframeRouteRestorationPlugin() {
  return {
    name: "vite:iframe-route-restoration",
    apply: "serve",
    transformIndexHtml() {
      const script = `
      const ALLOWED_PARENT_ORIGINS = [
          "https://horizons.hostinger.com",
          "https://horizons.hostinger.dev",
          "https://horizons-frontend-local.hostinger.dev",
      ];

        // Check to see if the page is in an iframe
        if (window.self !== window.top) {
          const STORAGE_KEY = 'horizons-iframe-saved-route';

          const getCurrentRoute = () => location.pathname + location.search + location.hash;

          const save = () => {
            try {
              const currentRoute = getCurrentRoute();
              sessionStorage.setItem(STORAGE_KEY, currentRoute);
              window.parent.postMessage({message: 'route-changed', route: currentRoute}, '*');
            } catch {}
          };

          const replaceHistoryState = (url) => {
            try {
              history.replaceState(null, '', url);
              window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
              return true;
            } catch {}
            return false;
          };

          const restore = () => {
            try {
              const saved = sessionStorage.getItem(STORAGE_KEY);
              if (!saved) return;

              if (!saved.startsWith('/')) {
                sessionStorage.removeItem(STORAGE_KEY);
                return;
              }

              const current = getCurrentRoute();
              if (current !== saved) {
                if (!replaceHistoryState(saved)) {
                  replaceHistoryState('/');
                }

                requestAnimationFrame(() => setTimeout(() => {
                  try {
                    const text = (document.body?.innerText || '').trim();

                    // If the restored route results in too little content, assume it is invalid and navigate home
                    if (text.length < 50) {
                      replaceHistoryState('/');
                    }
                  } catch {}
                }, 1000));
              }
            } catch {}
          };

          const originalPushState = history.pushState;
          history.pushState = function(...args) {
            originalPushState.apply(this, args);
            save();
          };

          const originalReplaceState = history.replaceState;
          history.replaceState = function(...args) {
            originalReplaceState.apply(this, args);
            save();
          };

          const getParentOrigin = () => {
              if (
                  window.location.ancestorOrigins &&
                  window.location.ancestorOrigins.length > 0
              ) {
                  return window.location.ancestorOrigins[0];
              }

              if (document.referrer) {
                  try {
                      return new URL(document.referrer).origin;
                  } catch (e) {
                      console.warn("Invalid referrer URL:", document.referrer);
                  }
              }

              return null;
          };

          window.addEventListener('popstate', save);
          window.addEventListener('hashchange', save);
          window.addEventListener("message", function (event) {
              const parentOrigin = getParentOrigin();

              if (event.data?.type === "redirect-home" && parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {
                const saved = sessionStorage.getItem(STORAGE_KEY);

                if(saved && saved !== '/') {
                  replaceHistoryState('/')
                }
              }
          });

          restore();
        }
      `;
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: script,
          injectTo: "head"
        }
      ];
    }
  };
}

// plugins/selection-mode/vite-plugin-selection-mode.js
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve as resolve2 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
var __vite_injected_original_import_meta_url3 = "file:///C:/Users/fabri/OneDrive/Bureau/POWALYZE%20FINAL/plugins/selection-mode/vite-plugin-selection-mode.js";
var __filename3 = fileURLToPath3(__vite_injected_original_import_meta_url3);
var __dirname4 = resolve2(__filename3, "..");
function selectionModePlugin() {
  return {
    name: "vite:selection-mode",
    apply: "serve",
    transformIndexHtml() {
      const scriptPath = resolve2(__dirname4, "selection-mode-script.js");
      const scriptContent = readFileSync2(scriptPath, "utf-8");
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: scriptContent,
          injectTo: "body"
        }
      ];
    }
  };
}

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\fabri\\OneDrive\\Bureau\\POWALYZE FINAL";
var isDev = process.env.NODE_ENV !== "production";
var configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;
var configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;
var configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;
var configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Skip WebSocket URLs
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Exclude HTML document responses
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');

			if (!response.ok && !isDocumentResponse) {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.error(\`Fetch error from \${requestUrl}: \${errorFromRes}\`);
			}

			return response;
		})
		.catch(error => {
			if (!url.match(/.html?$/i)) {
				console.error(error);
			}

			throw error;
		});
};
`;
var configNavigationHandler = `
if (window.navigation && window.self !== window.top) {
	window.navigation.addEventListener('navigate', (event) => {
		const url = event.destination.url;

		try {
			const destinationUrl = new URL(url);
			const destinationOrigin = destinationUrl.origin;
			const currentOrigin = window.location.origin;

			if (destinationOrigin === currentOrigin) {
				return;
			}
		} catch (error) {
			return;
		}

		window.parent.postMessage({
			type: 'horizons-navigation-error',
			url,
		}, '*');
	});
}
`;
var addTransformIndexHtml = {
  name: "add-transform-index-html",
  transformIndexHtml(html) {
    const tags = [
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsRuntimeErrorHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsViteErrorHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsConsoleErrroHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configWindowFetchMonkeyPatch,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configNavigationHandler,
        injectTo: "head"
      }
    ];
    if (!isDev && process.env.TEMPLATE_BANNER_SCRIPT_URL && process.env.TEMPLATE_REDIRECT_URL) {
      tags.push(
        {
          tag: "script",
          attrs: {
            src: process.env.TEMPLATE_BANNER_SCRIPT_URL,
            "template-redirect-url": process.env.TEMPLATE_REDIRECT_URL
          },
          injectTo: "head"
        }
      );
    }
    return {
      html,
      tags
    };
  }
};
console.warn = () => {
};
var logger = createLogger();
var loggerError = logger.error;
logger.error = (msg, options) => {
  var _a;
  if ((_a = options == null ? void 0 : options.error) == null ? void 0 : _a.toString().includes("CssSyntaxError: [postcss]")) {
    return;
  }
  loggerError(msg, options);
};
var vite_config_default = defineConfig({
  customLogger: logger,
  plugins: [
    ...isDev ? [inlineEditPlugin(), inlineEditDevPlugin(), iframeRouteRestorationPlugin(), selectionModePlugin()] : [],
    react(),
    addTransformIndexHtml
  ],
  server: {
    cors: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "credentialless"
    },
    allowedHosts: true
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
    alias: {
      "@": path3.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: [
        "@babel/parser",
        "@babel/traverse",
        "@babel/generator",
        "@babel/types"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLXJlYWN0LWlubGluZS1lZGl0b3IuanMiLCAicGx1Z2lucy91dGlscy9hc3QtdXRpbHMuanMiLCAicGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qcyIsICJwbHVnaW5zL3Zpc3VhbC1lZGl0b3IvdmlzdWFsLWVkaXRvci1jb25maWcuanMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1pZnJhbWUtcm91dGUtcmVzdG9yYXRpb24uanMiLCAicGx1Z2lucy9zZWxlY3Rpb24tbW9kZS92aXRlLXBsdWdpbi1zZWxlY3Rpb24tbW9kZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmFicmlcXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXFBPV0FMWVpFIEZJTkFMXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mYWJyaS9PbmVEcml2ZS9CdXJlYXUvUE9XQUxZWkUlMjBGSU5BTC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBpbmxpbmVFZGl0UGx1Z2luIGZyb20gJy4vcGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLXJlYWN0LWlubGluZS1lZGl0b3IuanMnO1xuaW1wb3J0IGVkaXRNb2RlRGV2UGx1Z2luIGZyb20gJy4vcGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qcyc7XG5pbXBvcnQgaWZyYW1lUm91dGVSZXN0b3JhdGlvblBsdWdpbiBmcm9tICcuL3BsdWdpbnMvdml0ZS1wbHVnaW4taWZyYW1lLXJvdXRlLXJlc3RvcmF0aW9uLmpzJztcbmltcG9ydCBzZWxlY3Rpb25Nb2RlUGx1Z2luIGZyb20gJy4vcGx1Z2lucy9zZWxlY3Rpb24tbW9kZS92aXRlLXBsdWdpbi1zZWxlY3Rpb24tbW9kZS5qcyc7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxuY29uc3QgY29uZmlnSG9yaXpvbnNWaXRlRXJyb3JIYW5kbGVyID0gYFxuY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG5cdGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG5cdFx0Zm9yIChjb25zdCBhZGRlZE5vZGUgb2YgbXV0YXRpb24uYWRkZWROb2Rlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRhZGRlZE5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG5cdFx0XHRcdChcblx0XHRcdFx0XHRhZGRlZE5vZGUudGFnTmFtZT8udG9Mb3dlckNhc2UoKSA9PT0gJ3ZpdGUtZXJyb3Itb3ZlcmxheScgfHxcblx0XHRcdFx0XHRhZGRlZE5vZGUuY2xhc3NMaXN0Py5jb250YWlucygnYmFja2Ryb3AnKVxuXHRcdFx0XHQpXG5cdFx0XHQpIHtcblx0XHRcdFx0aGFuZGxlVml0ZU92ZXJsYXkoYWRkZWROb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuXHRjaGlsZExpc3Q6IHRydWUsXG5cdHN1YnRyZWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVWaXRlT3ZlcmxheShub2RlKSB7XG5cdGlmICghbm9kZS5zaGFkb3dSb290KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYmFja2Ryb3AgPSBub2RlLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XG5cblx0aWYgKGJhY2tkcm9wKSB7XG5cdFx0Y29uc3Qgb3ZlcmxheUh0bWwgPSBiYWNrZHJvcC5vdXRlckhUTUw7XG5cdFx0Y29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuXHRcdGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcob3ZlcmxheUh0bWwsICd0ZXh0L2h0bWwnKTtcblx0XHRjb25zdCBtZXNzYWdlQm9keUVsZW1lbnQgPSBkb2MucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm9keScpO1xuXHRcdGNvbnN0IGZpbGVFbGVtZW50ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJy5maWxlJyk7XG5cdFx0Y29uc3QgbWVzc2FnZVRleHQgPSBtZXNzYWdlQm9keUVsZW1lbnQgPyBtZXNzYWdlQm9keUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpIDogJyc7XG5cdFx0Y29uc3QgZmlsZVRleHQgPSBmaWxlRWxlbWVudCA/IGZpbGVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKSA6ICcnO1xuXHRcdGNvbnN0IGVycm9yID0gbWVzc2FnZVRleHQgKyAoZmlsZVRleHQgPyAnIEZpbGU6JyArIGZpbGVUZXh0IDogJycpO1xuXG5cdFx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG5cdFx0XHR0eXBlOiAnaG9yaXpvbnMtdml0ZS1lcnJvcicsXG5cdFx0XHRlcnJvcixcblx0XHR9LCAnKicpO1xuXHR9XG59XG5gO1xuXG5jb25zdCBjb25maWdIb3Jpem9uc1J1bnRpbWVFcnJvckhhbmRsZXIgPSBgXG53aW5kb3cub25lcnJvciA9IChtZXNzYWdlLCBzb3VyY2UsIGxpbmVubywgY29sbm8sIGVycm9yT2JqKSA9PiB7XG5cdGNvbnN0IGVycm9yRGV0YWlscyA9IGVycm9yT2JqID8gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdG5hbWU6IGVycm9yT2JqLm5hbWUsXG5cdFx0bWVzc2FnZTogZXJyb3JPYmoubWVzc2FnZSxcblx0XHRzdGFjazogZXJyb3JPYmouc3RhY2ssXG5cdFx0c291cmNlLFxuXHRcdGxpbmVubyxcblx0XHRjb2xubyxcblx0fSkgOiBudWxsO1xuXG5cdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuXHRcdHR5cGU6ICdob3Jpem9ucy1ydW50aW1lLWVycm9yJyxcblx0XHRtZXNzYWdlLFxuXHRcdGVycm9yOiBlcnJvckRldGFpbHNcblx0fSwgJyonKTtcbn07XG5gO1xuXG5jb25zdCBjb25maWdIb3Jpem9uc0NvbnNvbGVFcnJyb0hhbmRsZXIgPSBgXG5jb25zdCBvcmlnaW5hbENvbnNvbGVFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5jb25zb2xlLmVycm9yID0gZnVuY3Rpb24oLi4uYXJncykge1xuXHRvcmlnaW5hbENvbnNvbGVFcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcblxuXHRsZXQgZXJyb3JTdHJpbmcgPSAnJztcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBhcmcgPSBhcmdzW2ldO1xuXHRcdGlmIChhcmcgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0ZXJyb3JTdHJpbmcgPSBhcmcuc3RhY2sgfHwgXFxgXFwke2FyZy5uYW1lfTogXFwke2FyZy5tZXNzYWdlfVxcYDtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmICghZXJyb3JTdHJpbmcpIHtcblx0XHRlcnJvclN0cmluZyA9IGFyZ3MubWFwKGFyZyA9PiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZykgOiBTdHJpbmcoYXJnKSkuam9pbignICcpO1xuXHR9XG5cblx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG5cdFx0dHlwZTogJ2hvcml6b25zLWNvbnNvbGUtZXJyb3InLFxuXHRcdGVycm9yOiBlcnJvclN0cmluZ1xuXHR9LCAnKicpO1xufTtcbmA7XG5cbmNvbnN0IGNvbmZpZ1dpbmRvd0ZldGNoTW9ua2V5UGF0Y2ggPSBgXG5jb25zdCBvcmlnaW5hbEZldGNoID0gd2luZG93LmZldGNoO1xuXG53aW5kb3cuZmV0Y2ggPSBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdGNvbnN0IHVybCA9IGFyZ3NbMF0gaW5zdGFuY2VvZiBSZXF1ZXN0ID8gYXJnc1swXS51cmwgOiBhcmdzWzBdO1xuXG5cdC8vIFNraXAgV2ViU29ja2V0IFVSTHNcblx0aWYgKHVybC5zdGFydHNXaXRoKCd3czonKSB8fCB1cmwuc3RhcnRzV2l0aCgnd3NzOicpKSB7XG5cdFx0cmV0dXJuIG9yaWdpbmFsRmV0Y2guYXBwbHkodGhpcywgYXJncyk7XG5cdH1cblxuXHRyZXR1cm4gb3JpZ2luYWxGZXRjaC5hcHBseSh0aGlzLCBhcmdzKVxuXHRcdC50aGVuKGFzeW5jIHJlc3BvbnNlID0+IHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpIHx8ICcnO1xuXG5cdFx0XHQvLyBFeGNsdWRlIEhUTUwgZG9jdW1lbnQgcmVzcG9uc2VzXG5cdFx0XHRjb25zdCBpc0RvY3VtZW50UmVzcG9uc2UgPVxuXHRcdFx0XHRjb250ZW50VHlwZS5pbmNsdWRlcygndGV4dC9odG1sJykgfHxcblx0XHRcdFx0Y29udGVudFR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcpO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rICYmICFpc0RvY3VtZW50UmVzcG9uc2UpIHtcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZUNsb25lID0gcmVzcG9uc2UuY2xvbmUoKTtcblx0XHRcdFx0XHRjb25zdCBlcnJvckZyb21SZXMgPSBhd2FpdCByZXNwb25zZUNsb25lLnRleHQoKTtcblx0XHRcdFx0XHRjb25zdCByZXF1ZXN0VXJsID0gcmVzcG9uc2UudXJsO1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXFxgRmV0Y2ggZXJyb3IgZnJvbSBcXCR7cmVxdWVzdFVybH06IFxcJHtlcnJvckZyb21SZXN9XFxgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdGlmICghdXJsLm1hdGNoKC9cXC5odG1sPyQvaSkpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHR9XG5cblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH0pO1xufTtcbmA7XG5cbmNvbnN0IGNvbmZpZ05hdmlnYXRpb25IYW5kbGVyID0gYFxuaWYgKHdpbmRvdy5uYXZpZ2F0aW9uICYmIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wKSB7XG5cdHdpbmRvdy5uYXZpZ2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ25hdmlnYXRlJywgKGV2ZW50KSA9PiB7XG5cdFx0Y29uc3QgdXJsID0gZXZlbnQuZGVzdGluYXRpb24udXJsO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGRlc3RpbmF0aW9uVXJsID0gbmV3IFVSTCh1cmwpO1xuXHRcdFx0Y29uc3QgZGVzdGluYXRpb25PcmlnaW4gPSBkZXN0aW5hdGlvblVybC5vcmlnaW47XG5cdFx0XHRjb25zdCBjdXJyZW50T3JpZ2luID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcblxuXHRcdFx0aWYgKGRlc3RpbmF0aW9uT3JpZ2luID09PSBjdXJyZW50T3JpZ2luKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0dHlwZTogJ2hvcml6b25zLW5hdmlnYXRpb24tZXJyb3InLFxuXHRcdFx0dXJsLFxuXHRcdH0sICcqJyk7XG5cdH0pO1xufVxuYDtcblxuY29uc3QgYWRkVHJhbnNmb3JtSW5kZXhIdG1sID0ge1xuXHRuYW1lOiAnYWRkLXRyYW5zZm9ybS1pbmRleC1odG1sJyxcblx0dHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcblx0XHRjb25zdCB0YWdzID0gW1xuXHRcdFx0e1xuXHRcdFx0XHR0YWc6ICdzY3JpcHQnLFxuXHRcdFx0XHRhdHRyczogeyB0eXBlOiAnbW9kdWxlJyB9LFxuXHRcdFx0XHRjaGlsZHJlbjogY29uZmlnSG9yaXpvbnNSdW50aW1lRXJyb3JIYW5kbGVyLFxuXHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0YXR0cnM6IHsgdHlwZTogJ21vZHVsZScgfSxcblx0XHRcdFx0Y2hpbGRyZW46IGNvbmZpZ0hvcml6b25zVml0ZUVycm9ySGFuZGxlcixcblx0XHRcdFx0aW5qZWN0VG86ICdoZWFkJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRhZzogJ3NjcmlwdCcsXG5cdFx0XHRcdGF0dHJzOiB7dHlwZTogJ21vZHVsZSd9LFxuXHRcdFx0XHRjaGlsZHJlbjogY29uZmlnSG9yaXpvbnNDb25zb2xlRXJycm9IYW5kbGVyLFxuXHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0YXR0cnM6IHsgdHlwZTogJ21vZHVsZScgfSxcblx0XHRcdFx0Y2hpbGRyZW46IGNvbmZpZ1dpbmRvd0ZldGNoTW9ua2V5UGF0Y2gsXG5cdFx0XHRcdGluamVjdFRvOiAnaGVhZCcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0YWc6ICdzY3JpcHQnLFxuXHRcdFx0XHRhdHRyczogeyB0eXBlOiAnbW9kdWxlJyB9LFxuXHRcdFx0XHRjaGlsZHJlbjogY29uZmlnTmF2aWdhdGlvbkhhbmRsZXIsXG5cdFx0XHRcdGluamVjdFRvOiAnaGVhZCcsXG5cdFx0XHR9LFxuXHRcdF07XG5cblx0XHRpZiAoIWlzRGV2ICYmIHByb2Nlc3MuZW52LlRFTVBMQVRFX0JBTk5FUl9TQ1JJUFRfVVJMICYmIHByb2Nlc3MuZW52LlRFTVBMQVRFX1JFRElSRUNUX1VSTCkge1xuXHRcdFx0dGFncy5wdXNoKFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0XHRhdHRyczoge1xuXHRcdFx0XHRcdFx0c3JjOiBwcm9jZXNzLmVudi5URU1QTEFURV9CQU5ORVJfU0NSSVBUX1VSTCxcblx0XHRcdFx0XHRcdCd0ZW1wbGF0ZS1yZWRpcmVjdC11cmwnOiBwcm9jZXNzLmVudi5URU1QTEFURV9SRURJUkVDVF9VUkwsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnLFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRodG1sLFxuXHRcdFx0dGFncyxcblx0XHR9O1xuXHR9LFxufTtcblxuY29uc29sZS53YXJuID0gKCkgPT4ge307XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcigpXG5jb25zdCBsb2dnZXJFcnJvciA9IGxvZ2dlci5lcnJvclxuXG5sb2dnZXIuZXJyb3IgPSAobXNnLCBvcHRpb25zKSA9PiB7XG5cdGlmIChvcHRpb25zPy5lcnJvcj8udG9TdHJpbmcoKS5pbmNsdWRlcygnQ3NzU3ludGF4RXJyb3I6IFtwb3N0Y3NzXScpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bG9nZ2VyRXJyb3IobXNnLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0Y3VzdG9tTG9nZ2VyOiBsb2dnZXIsXG5cdHBsdWdpbnM6IFtcblx0XHQuLi4oaXNEZXYgPyBbaW5saW5lRWRpdFBsdWdpbigpLCBlZGl0TW9kZURldlBsdWdpbigpLCBpZnJhbWVSb3V0ZVJlc3RvcmF0aW9uUGx1Z2luKCksIHNlbGVjdGlvbk1vZGVQbHVnaW4oKV0gOiBbXSksXG5cdFx0cmVhY3QoKSxcblx0XHRhZGRUcmFuc2Zvcm1JbmRleEh0bWxcblx0XSxcblx0c2VydmVyOiB7XG5cdFx0Y29yczogdHJ1ZSxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeSc6ICdjcmVkZW50aWFsbGVzcycsXG5cdFx0fSxcblx0XHRhbGxvd2VkSG9zdHM6IHRydWUsXG5cdH0sXG5cdHJlc29sdmU6IHtcblx0XHRleHRlbnNpb25zOiBbJy5qc3gnLCAnLmpzJywgJy50c3gnLCAnLnRzJywgJy5qc29uJywgXSxcblx0XHRhbGlhczoge1xuXHRcdFx0J0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcblx0XHR9LFxuXHR9LFxuXHRidWlsZDoge1xuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGV4dGVybmFsOiBbXG5cdFx0XHRcdCdAYmFiZWwvcGFyc2VyJyxcblx0XHRcdFx0J0BiYWJlbC90cmF2ZXJzZScsXG5cdFx0XHRcdCdAYmFiZWwvZ2VuZXJhdG9yJyxcblx0XHRcdFx0J0BiYWJlbC90eXBlcydcblx0XHRcdF1cblx0XHR9XG5cdH1cbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmYWJyaVxcXFxPbmVEcml2ZVxcXFxCdXJlYXVcXFxcUE9XQUxZWkUgRklOQUxcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmYWJyaVxcXFxPbmVEcml2ZVxcXFxCdXJlYXVcXFxcUE9XQUxZWkUgRklOQUxcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXFxcXHZpdGUtcGx1Z2luLXJlYWN0LWlubGluZS1lZGl0b3IuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2ZhYnJpL09uZURyaXZlL0J1cmVhdS9QT1dBTFlaRSUyMEZJTkFML3BsdWdpbnMvdmlzdWFsLWVkaXRvci92aXRlLXBsdWdpbi1yZWFjdC1pbmxpbmUtZWRpdG9yLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ0BiYWJlbC9wYXJzZXInO1xuaW1wb3J0IHRyYXZlcnNlQmFiZWwgZnJvbSAnQGJhYmVsL3RyYXZlcnNlJztcbmltcG9ydCAqIGFzIHQgZnJvbSAnQGJhYmVsL3R5cGVzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBcblx0dmFsaWRhdGVGaWxlUGF0aCwgXG5cdHBhcnNlRmlsZVRvQVNULCBcblx0ZmluZEpTWEVsZW1lbnRBdFBvc2l0aW9uLFxuXHRnZW5lcmF0ZUNvZGUsXG5cdGdlbmVyYXRlU291cmNlV2l0aE1hcCxcblx0VklURV9QUk9KRUNUX1JPT1Rcbn0gZnJvbSAnLi4vdXRpbHMvYXN0LXV0aWxzLmpzJztcblxuY29uc3QgRURJVEFCTEVfSFRNTF9UQUdTID0gW1wiYVwiLCBcIkJ1dHRvblwiLCBcImJ1dHRvblwiLCBcInBcIiwgXCJzcGFuXCIsIFwiaDFcIiwgXCJoMlwiLCBcImgzXCIsIFwiaDRcIiwgXCJoNVwiLCBcImg2XCIsIFwibGFiZWxcIiwgXCJMYWJlbFwiLCBcImltZ1wiXTtcblxuZnVuY3Rpb24gcGFyc2VFZGl0SWQoZWRpdElkKSB7XG5cdGNvbnN0IHBhcnRzID0gZWRpdElkLnNwbGl0KCc6Jyk7XG5cblx0aWYgKHBhcnRzLmxlbmd0aCA8IDMpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IGNvbHVtbiA9IHBhcnNlSW50KHBhcnRzLmF0KC0xKSwgMTApO1xuXHRjb25zdCBsaW5lID0gcGFyc2VJbnQocGFydHMuYXQoLTIpLCAxMCk7XG5cdGNvbnN0IGZpbGVQYXRoID0gcGFydHMuc2xpY2UoMCwgLTIpLmpvaW4oJzonKTtcblxuXHRpZiAoIWZpbGVQYXRoIHx8IGlzTmFOKGxpbmUpIHx8IGlzTmFOKGNvbHVtbikpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiB7IGZpbGVQYXRoLCBsaW5lLCBjb2x1bW4gfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUYWdOYW1lRWRpdGFibGUob3BlbmluZ0VsZW1lbnROb2RlLCBlZGl0YWJsZVRhZ3NMaXN0KSB7XG5cdGlmICghb3BlbmluZ0VsZW1lbnROb2RlIHx8ICFvcGVuaW5nRWxlbWVudE5vZGUubmFtZSkgcmV0dXJuIGZhbHNlO1xuXHRjb25zdCBuYW1lTm9kZSA9IG9wZW5pbmdFbGVtZW50Tm9kZS5uYW1lO1xuXG5cdC8vIENoZWNrIDE6IERpcmVjdCBuYW1lIChmb3IgPHA+LCA8QnV0dG9uPilcblx0aWYgKG5hbWVOb2RlLnR5cGUgPT09ICdKU1hJZGVudGlmaWVyJyAmJiBlZGl0YWJsZVRhZ3NMaXN0LmluY2x1ZGVzKG5hbWVOb2RlLm5hbWUpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBDaGVjayAyOiBQcm9wZXJ0eSBuYW1lIG9mIGEgbWVtYmVyIGV4cHJlc3Npb24gKGZvciA8bW90aW9uLmgxPiwgY2hlY2sgaWYgXCJoMVwiIGlzIGluIGVkaXRhYmxlVGFnc0xpc3QpXG5cdGlmIChuYW1lTm9kZS50eXBlID09PSAnSlNYTWVtYmVyRXhwcmVzc2lvbicgJiYgbmFtZU5vZGUucHJvcGVydHkgJiYgbmFtZU5vZGUucHJvcGVydHkudHlwZSA9PT0gJ0pTWElkZW50aWZpZXInICYmIGVkaXRhYmxlVGFnc0xpc3QuaW5jbHVkZXMobmFtZU5vZGUucHJvcGVydHkubmFtZSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVJbWFnZVNyYyhvcGVuaW5nTm9kZSkge1xuXHRpZiAoIW9wZW5pbmdOb2RlIHx8ICFvcGVuaW5nTm9kZS5uYW1lIHx8IG9wZW5pbmdOb2RlLm5hbWUubmFtZSAhPT0gJ2ltZycpIHtcblx0XHRyZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCByZWFzb246IG51bGwgfTsgLy8gTm90IGFuIGltYWdlLCBza2lwIHZhbGlkYXRpb25cblx0fVxuXG5cdGNvbnN0IGhhc1Byb3BzU3ByZWFkID0gb3BlbmluZ05vZGUuYXR0cmlidXRlcy5zb21lKGF0dHIgPT5cblx0XHR0LmlzSlNYU3ByZWFkQXR0cmlidXRlKGF0dHIpICYmXG5cdFx0YXR0ci5hcmd1bWVudCAmJlxuXHRcdHQuaXNJZGVudGlmaWVyKGF0dHIuYXJndW1lbnQpICYmXG5cdFx0YXR0ci5hcmd1bWVudC5uYW1lID09PSAncHJvcHMnXG5cdCk7XG5cblx0aWYgKGhhc1Byb3BzU3ByZWFkKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbjogJ3Byb3BzLXNwcmVhZCcgfTtcblx0fVxuXG5cdGNvbnN0IHNyY0F0dHIgPSBvcGVuaW5nTm9kZS5hdHRyaWJ1dGVzLmZpbmQoYXR0ciA9PlxuXHRcdHQuaXNKU1hBdHRyaWJ1dGUoYXR0cikgJiZcblx0XHRhdHRyLm5hbWUgJiZcblx0XHRhdHRyLm5hbWUubmFtZSA9PT0gJ3NyYydcblx0KTtcblxuXHRpZiAoIXNyY0F0dHIpIHtcblx0XHRyZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uOiAnbWlzc2luZy1zcmMnIH07XG5cdH1cblxuXHRpZiAoIXQuaXNTdHJpbmdMaXRlcmFsKHNyY0F0dHIudmFsdWUpKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbjogJ2R5bmFtaWMtc3JjJyB9O1xuXHR9XG5cblx0aWYgKCFzcmNBdHRyLnZhbHVlLnZhbHVlIHx8IHNyY0F0dHIudmFsdWUudmFsdWUudHJpbSgpID09PSAnJykge1xuXHRcdHJldHVybiB7IGlzVmFsaWQ6IGZhbHNlLCByZWFzb246ICdlbXB0eS1zcmMnIH07XG5cdH1cblxuXHRyZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCByZWFzb246IG51bGwgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5saW5lRWRpdFBsdWdpbigpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAndml0ZS1pbmxpbmUtZWRpdC1wbHVnaW4nLFxuXHRcdGVuZm9yY2U6ICdwcmUnLFxuXG5cdFx0dHJhbnNmb3JtKGNvZGUsIGlkKSB7XG5cdFx0XHRpZiAoIS9cXC4oanN4fHRzeCkkLy50ZXN0KGlkKSB8fCAhaWQuc3RhcnRzV2l0aChWSVRFX1BST0pFQ1RfUk9PVCkgfHwgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZWxhdGl2ZUZpbGVQYXRoID0gcGF0aC5yZWxhdGl2ZShWSVRFX1BST0pFQ1RfUk9PVCwgaWQpO1xuXHRcdFx0Y29uc3Qgd2ViUmVsYXRpdmVGaWxlUGF0aCA9IHJlbGF0aXZlRmlsZVBhdGguc3BsaXQocGF0aC5zZXApLmpvaW4oJy8nKTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgYmFiZWxBc3QgPSBwYXJzZShjb2RlLCB7XG5cdFx0XHRcdFx0c291cmNlVHlwZTogJ21vZHVsZScsXG5cdFx0XHRcdFx0cGx1Z2luczogWydqc3gnLCAndHlwZXNjcmlwdCddLFxuXHRcdFx0XHRcdGVycm9yUmVjb3Zlcnk6IHRydWVcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0bGV0IGF0dHJpYnV0ZXNBZGRlZCA9IDA7XG5cblx0XHRcdFx0dHJhdmVyc2VCYWJlbC5kZWZhdWx0KGJhYmVsQXN0LCB7XG5cdFx0XHRcdFx0ZW50ZXIocGF0aCkge1xuXHRcdFx0XHRcdFx0aWYgKHBhdGguaXNKU1hPcGVuaW5nRWxlbWVudCgpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG9wZW5pbmdOb2RlID0gcGF0aC5ub2RlO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50Tm9kZSA9IHBhdGgucGFyZW50UGF0aC5ub2RlOyAvLyBUaGUgSlNYRWxlbWVudCBpdHNlbGZcblxuXHRcdFx0XHRcdFx0XHRpZiAoIW9wZW5pbmdOb2RlLmxvYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGFscmVhZHlIYXNJZCA9IG9wZW5pbmdOb2RlLmF0dHJpYnV0ZXMuc29tZShcblx0XHRcdFx0XHRcdFx0XHQoYXR0cikgPT4gdC5pc0pTWEF0dHJpYnV0ZShhdHRyKSAmJiBhdHRyLm5hbWUubmFtZSA9PT0gJ2RhdGEtZWRpdC1pZCdcblx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoYWxyZWFkeUhhc0lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIDE6IElzIHRoZSBjdXJyZW50IGVsZW1lbnQgdGFnIHR5cGUgZWRpdGFibGU/XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGlzQ3VycmVudEVsZW1lbnRFZGl0YWJsZSA9IGNoZWNrVGFnTmFtZUVkaXRhYmxlKG9wZW5pbmdOb2RlLCBFRElUQUJMRV9IVE1MX1RBR1MpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWlzQ3VycmVudEVsZW1lbnRFZGl0YWJsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGltYWdlVmFsaWRhdGlvbiA9IHZhbGlkYXRlSW1hZ2VTcmMob3BlbmluZ05vZGUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWltYWdlVmFsaWRhdGlvbi5pc1ZhbGlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZGlzYWJsZWRBdHRyaWJ1dGUgPSB0LmpzeEF0dHJpYnV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdHQuanN4SWRlbnRpZmllcignZGF0YS1lZGl0LWRpc2FibGVkJyksXG5cdFx0XHRcdFx0XHRcdFx0XHR0LnN0cmluZ0xpdGVyYWwoJ3RydWUnKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0b3BlbmluZ05vZGUuYXR0cmlidXRlcy5wdXNoKGRpc2FibGVkQXR0cmlidXRlKTtcblx0XHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzQWRkZWQrKztcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRsZXQgc2hvdWxkQmVEaXNhYmxlZER1ZVRvQ2hpbGRyZW4gPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gMjogRG9lcyB0aGUgZWxlbWVudCBoYXZlIGR5bmFtaWMgb3IgZWRpdGFibGUgY2hpbGRyZW5cblx0XHRcdFx0XHRcdFx0aWYgKHQuaXNKU1hFbGVtZW50KGVsZW1lbnROb2RlKSAmJiBlbGVtZW50Tm9kZS5jaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIHsuLi5wcm9wc30gc3ByZWFkIGF0dHJpYnV0ZSAtIGRpc2FibGUgZWRpdGluZyBpZiBpdCBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaGFzUHJvcHNTcHJlYWQgPSBvcGVuaW5nTm9kZS5hdHRyaWJ1dGVzLnNvbWUoYXR0ciA9PiB0LmlzSlNYU3ByZWFkQXR0cmlidXRlKGF0dHIpXG5cdFx0XHRcdFx0XHRcdFx0XHQmJiBhdHRyLmFyZ3VtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHQmJiB0LmlzSWRlbnRpZmllcihhdHRyLmFyZ3VtZW50KVxuXHRcdFx0XHRcdFx0XHRcdFx0JiYgYXR0ci5hcmd1bWVudC5uYW1lID09PSAncHJvcHMnXG5cdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGhhc0R5bmFtaWNDaGlsZCA9IGVsZW1lbnROb2RlLmNoaWxkcmVuLnNvbWUoY2hpbGQgPT5cblx0XHRcdFx0XHRcdFx0XHRcdHQuaXNKU1hFeHByZXNzaW9uQ29udGFpbmVyKGNoaWxkKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaGFzRHluYW1pY0NoaWxkIHx8IGhhc1Byb3BzU3ByZWFkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzaG91bGRCZURpc2FibGVkRHVlVG9DaGlsZHJlbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFzaG91bGRCZURpc2FibGVkRHVlVG9DaGlsZHJlbiAmJiB0LmlzSlNYRWxlbWVudChlbGVtZW50Tm9kZSkgJiYgZWxlbWVudE5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBoYXNFZGl0YWJsZUpzeENoaWxkID0gZWxlbWVudE5vZGUuY2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodC5pc0pTWEVsZW1lbnQoY2hpbGQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjaGVja1RhZ05hbWVFZGl0YWJsZShjaGlsZC5vcGVuaW5nRWxlbWVudCwgRURJVEFCTEVfSFRNTF9UQUdTKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGhhc0VkaXRhYmxlSnN4Q2hpbGQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNob3VsZEJlRGlzYWJsZWREdWVUb0NoaWxkcmVuID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoc2hvdWxkQmVEaXNhYmxlZER1ZVRvQ2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXNhYmxlZEF0dHJpYnV0ZSA9IHQuanN4QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0dC5qc3hJZGVudGlmaWVyKCdkYXRhLWVkaXQtZGlzYWJsZWQnKSxcblx0XHRcdFx0XHRcdFx0XHRcdHQuc3RyaW5nTGl0ZXJhbCgndHJ1ZScpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdG9wZW5pbmdOb2RlLmF0dHJpYnV0ZXMucHVzaChkaXNhYmxlZEF0dHJpYnV0ZSk7XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlc0FkZGVkKys7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIDM6IFBhcmVudCBpcyBub24tZWRpdGFibGUgaWYgQVQgTEVBU1QgT05FIGNoaWxkIEpTWEVsZW1lbnQgaXMgYSBub24tZWRpdGFibGUgdHlwZS5cblx0XHRcdFx0XHRcdFx0aWYgKHQuaXNKU1hFbGVtZW50KGVsZW1lbnROb2RlKSAmJiBlbGVtZW50Tm9kZS5jaGlsZHJlbiAmJiBlbGVtZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGhhc05vbkVkaXRhYmxlSnN4Q2hpbGQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGVsZW1lbnROb2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodC5pc0pTWEVsZW1lbnQoY2hpbGQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hlY2tUYWdOYW1lRWRpdGFibGUoY2hpbGQub3BlbmluZ0VsZW1lbnQsIEVESVRBQkxFX0hUTUxfVEFHUykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoYXNOb25FZGl0YWJsZUpzeENoaWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAoaGFzTm9uRWRpdGFibGVKc3hDaGlsZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZGlzYWJsZWRBdHRyaWJ1dGUgPSB0LmpzeEF0dHJpYnV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdFx0dC5qc3hJZGVudGlmaWVyKCdkYXRhLWVkaXQtZGlzYWJsZWQnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dC5zdHJpbmdMaXRlcmFsKFwidHJ1ZVwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdG9wZW5pbmdOb2RlLmF0dHJpYnV0ZXMucHVzaChkaXNhYmxlZEF0dHJpYnV0ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzQWRkZWQrKztcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gNDogSXMgYW55IGFuY2VzdG9yIEpTWEVsZW1lbnQgYWxzbyBlZGl0YWJsZT9cblx0XHRcdFx0XHRcdFx0bGV0IGN1cnJlbnRBbmNlc3RvckNhbmRpZGF0ZVBhdGggPSBwYXRoLnBhcmVudFBhdGgucGFyZW50UGF0aDtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKGN1cnJlbnRBbmNlc3RvckNhbmRpZGF0ZVBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBhbmNlc3RvckpzeEVsZW1lbnRQYXRoID0gY3VycmVudEFuY2VzdG9yQ2FuZGlkYXRlUGF0aC5pc0pTWEVsZW1lbnQoKVxuXHRcdFx0XHRcdFx0XHRcdFx0PyBjdXJyZW50QW5jZXN0b3JDYW5kaWRhdGVQYXRoXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IGN1cnJlbnRBbmNlc3RvckNhbmRpZGF0ZVBhdGguZmluZFBhcmVudChwID0+IHAuaXNKU1hFbGVtZW50KCkpO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFhbmNlc3RvckpzeEVsZW1lbnRQYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoY2hlY2tUYWdOYW1lRWRpdGFibGUoYW5jZXN0b3JKc3hFbGVtZW50UGF0aC5ub2RlLm9wZW5pbmdFbGVtZW50LCBFRElUQUJMRV9IVE1MX1RBR1MpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRBbmNlc3RvckNhbmRpZGF0ZVBhdGggPSBhbmNlc3RvckpzeEVsZW1lbnRQYXRoLnBhcmVudFBhdGg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRjb25zdCBsaW5lID0gb3BlbmluZ05vZGUubG9jLnN0YXJ0LmxpbmU7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNvbHVtbiA9IG9wZW5pbmdOb2RlLmxvYy5zdGFydC5jb2x1bW4gKyAxO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZGl0SWQgPSBgJHt3ZWJSZWxhdGl2ZUZpbGVQYXRofToke2xpbmV9OiR7Y29sdW1ufWA7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgaWRBdHRyaWJ1dGUgPSB0LmpzeEF0dHJpYnV0ZShcblx0XHRcdFx0XHRcdFx0XHR0LmpzeElkZW50aWZpZXIoJ2RhdGEtZWRpdC1pZCcpLFxuXHRcdFx0XHRcdFx0XHRcdHQuc3RyaW5nTGl0ZXJhbChlZGl0SWQpXG5cdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0b3BlbmluZ05vZGUuYXR0cmlidXRlcy5wdXNoKGlkQXR0cmlidXRlKTtcblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlc0FkZGVkKys7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoYXR0cmlidXRlc0FkZGVkID4gMCkge1xuXHRcdFx0XHRcdGNvbnN0IG91dHB1dCA9IGdlbmVyYXRlU291cmNlV2l0aE1hcChiYWJlbEFzdCwgd2ViUmVsYXRpdmVGaWxlUGF0aCwgY29kZSk7XG5cdFx0XHRcdFx0cmV0dXJuIHsgY29kZTogb3V0cHV0LmNvZGUsIG1hcDogb3V0cHV0Lm1hcCB9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBbdml0ZV1bdmlzdWFsLWVkaXRvcl0gRXJyb3IgdHJhbnNmb3JtaW5nICR7aWR9OmAsIGVycm9yKTtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblxuXG5cdFx0Ly8gVXBkYXRlcyBzb3VyY2UgY29kZSBiYXNlZCBvbiB0aGUgY2hhbmdlcyByZWNlaXZlZCBmcm9tIHRoZSBjbGllbnRcblx0XHRjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG5cdFx0XHRzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL2FwcGx5LWVkaXQnLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRcdFx0aWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykgcmV0dXJuIG5leHQoKTtcblxuXHRcdFx0XHRsZXQgYm9keSA9ICcnO1xuXHRcdFx0XHRyZXEub24oJ2RhdGEnLCBjaHVuayA9PiB7IGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKTsgfSk7XG5cblx0XHRcdFx0cmVxLm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGFic29sdXRlRmlsZVBhdGggPSAnJztcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBlZGl0SWQsIG5ld0Z1bGxUZXh0IH0gPSBKU09OLnBhcnNlKGJvZHkpO1xuXG5cdFx0XHRcdFx0XHRpZiAoIWVkaXRJZCB8fCB0eXBlb2YgbmV3RnVsbFRleHQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNaXNzaW5nIGVkaXRJZCBvciBuZXdGdWxsVGV4dCcgfSkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb25zdCBwYXJzZWRJZCA9IHBhcnNlRWRpdElkKGVkaXRJZCk7XG5cdFx0XHRcdFx0XHRpZiAoIXBhcnNlZElkKSB7XG5cdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdJbnZhbGlkIGVkaXRJZCBmb3JtYXQgKGZpbGVQYXRoOmxpbmU6Y29sdW1uKScgfSkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb25zdCB7IGZpbGVQYXRoLCBsaW5lLCBjb2x1bW4gfSA9IHBhcnNlZElkO1xuXG5cdFx0XHRcdFx0XHQvLyBWYWxpZGF0ZSBmaWxlIHBhdGhcblx0XHRcdFx0XHRcdGNvbnN0IHZhbGlkYXRpb24gPSB2YWxpZGF0ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblx0XHRcdFx0XHRcdGlmICghdmFsaWRhdGlvbi5pc1ZhbGlkKSB7XG5cdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IHZhbGlkYXRpb24uZXJyb3IgfSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YWJzb2x1dGVGaWxlUGF0aCA9IHZhbGlkYXRpb24uYWJzb2x1dGVQYXRoO1xuXG5cdFx0XHRcdFx0XHQvLyBQYXJzZSBBU1Rcblx0XHRcdFx0XHRcdGNvbnN0IG9yaWdpbmFsQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhhYnNvbHV0ZUZpbGVQYXRoLCAndXRmLTgnKTtcblx0XHRcdFx0XHRcdGNvbnN0IGJhYmVsQXN0ID0gcGFyc2VGaWxlVG9BU1QoYWJzb2x1dGVGaWxlUGF0aCk7XG5cblx0XHRcdFx0XHRcdC8vIEZpbmQgdGFyZ2V0IG5vZGUgKG5vdGU6IGFwcGx5LWVkaXQgdXNlcyBjb2x1bW4rMSlcblx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldE5vZGVQYXRoID0gZmluZEpTWEVsZW1lbnRBdFBvc2l0aW9uKGJhYmVsQXN0LCBsaW5lLCBjb2x1bW4gKyAxKTtcblxuXHRcdFx0XHRcdFx0aWYgKCF0YXJnZXROb2RlUGF0aCkge1xuXHRcdFx0XHRcdFx0XHRyZXMud3JpdGVIZWFkKDQwNCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVGFyZ2V0IG5vZGUgbm90IGZvdW5kIGJ5IGxpbmUvY29sdW1uJywgZWRpdElkIH0pKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0T3BlbmluZ0VsZW1lbnQgPSB0YXJnZXROb2RlUGF0aC5ub2RlO1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFyZW50RWxlbWVudE5vZGUgPSB0YXJnZXROb2RlUGF0aC5wYXJlbnRQYXRoPy5ub2RlO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBpc0ltYWdlRWxlbWVudCA9IHRhcmdldE9wZW5pbmdFbGVtZW50Lm5hbWUgJiYgdGFyZ2V0T3BlbmluZ0VsZW1lbnQubmFtZS5uYW1lID09PSAnaW1nJztcblxuXHRcdFx0XHRcdFx0bGV0IGJlZm9yZUNvZGUgPSAnJztcblx0XHRcdFx0XHRcdGxldCBhZnRlckNvZGUgPSAnJztcblx0XHRcdFx0XHRcdGxldCBtb2RpZmllZCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0XHRpZiAoaXNJbWFnZUVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGltYWdlIHNyYyBhdHRyaWJ1dGUgdXBkYXRlXG5cdFx0XHRcdFx0XHRcdGJlZm9yZUNvZGUgPSBnZW5lcmF0ZUNvZGUodGFyZ2V0T3BlbmluZ0VsZW1lbnQpO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHNyY0F0dHIgPSB0YXJnZXRPcGVuaW5nRWxlbWVudC5hdHRyaWJ1dGVzLmZpbmQoYXR0ciA9PlxuXHRcdFx0XHRcdFx0XHRcdHQuaXNKU1hBdHRyaWJ1dGUoYXR0cikgJiYgYXR0ci5uYW1lICYmIGF0dHIubmFtZS5uYW1lID09PSAnc3JjJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChzcmNBdHRyICYmIHQuaXNTdHJpbmdMaXRlcmFsKHNyY0F0dHIudmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3JjQXR0ci52YWx1ZSA9IHQuc3RyaW5nTGl0ZXJhbChuZXdGdWxsVGV4dCk7XG5cdFx0XHRcdFx0XHRcdFx0bW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdGFmdGVyQ29kZSA9IGdlbmVyYXRlQ29kZSh0YXJnZXRPcGVuaW5nRWxlbWVudCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmIChwYXJlbnRFbGVtZW50Tm9kZSAmJiB0LmlzSlNYRWxlbWVudChwYXJlbnRFbGVtZW50Tm9kZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRiZWZvcmVDb2RlID0gZ2VuZXJhdGVDb2RlKHBhcmVudEVsZW1lbnROb2RlKTtcblxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudEVsZW1lbnROb2RlLmNoaWxkcmVuID0gW107XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG5ld0Z1bGxUZXh0ICYmIG5ld0Z1bGxUZXh0LnRyaW0oKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5ld1RleHROb2RlID0gdC5qc3hUZXh0KG5ld0Z1bGxUZXh0KTtcblx0XHRcdFx0XHRcdFx0XHRcdHBhcmVudEVsZW1lbnROb2RlLmNoaWxkcmVuLnB1c2gobmV3VGV4dE5vZGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRtb2RpZmllZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0YWZ0ZXJDb2RlID0gZ2VuZXJhdGVDb2RlKHBhcmVudEVsZW1lbnROb2RlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoIW1vZGlmaWVkKSB7XG5cdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA5LCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdDb3VsZCBub3QgYXBwbHkgY2hhbmdlcyB0byBBU1QuJyB9KSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHdlYlJlbGF0aXZlRmlsZVBhdGggPSBwYXRoLnJlbGF0aXZlKFZJVEVfUFJPSkVDVF9ST09ULCBhYnNvbHV0ZUZpbGVQYXRoKS5zcGxpdChwYXRoLnNlcCkuam9pbignLycpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb3V0cHV0ID0gZ2VuZXJhdGVTb3VyY2VXaXRoTWFwKGJhYmVsQXN0LCB3ZWJSZWxhdGl2ZUZpbGVQYXRoLCBvcmlnaW5hbENvbnRlbnQpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmV3Q29udGVudCA9IG91dHB1dC5jb2RlO1xuXG5cdFx0XHRcdFx0XHRyZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuXHRcdFx0XHRcdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHRcdFx0XHRcdG5ld0ZpbGVDb250ZW50OiBuZXdDb250ZW50LFxuXHRcdFx0XHRcdFx0XHRiZWZvcmVDb2RlLFxuXHRcdFx0XHRcdFx0XHRhZnRlckNvZGUsXG5cdFx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg1MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcblx0XHRcdFx0XHRcdHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvciBkdXJpbmcgZWRpdCBhcHBsaWNhdGlvbi4nIH0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmFicmlcXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXFBPV0FMWVpFIEZJTkFMXFxcXHBsdWdpbnNcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFxcXFxwbHVnaW5zXFxcXHV0aWxzXFxcXGFzdC11dGlscy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZmFicmkvT25lRHJpdmUvQnVyZWF1L1BPV0FMWVpFJTIwRklOQUwvcGx1Z2lucy91dGlscy9hc3QtdXRpbHMuanNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCBnZW5lcmF0ZSBmcm9tICdAYmFiZWwvZ2VuZXJhdG9yJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnQGJhYmVsL3BhcnNlcic7XG5pbXBvcnQgdHJhdmVyc2VCYWJlbCBmcm9tICdAYmFiZWwvdHJhdmVyc2UnO1xuaW1wb3J0IHtcblx0aXNKU1hJZGVudGlmaWVyLFxuXHRpc0pTWE1lbWJlckV4cHJlc3Npb24sXG59IGZyb20gJ0BiYWJlbC90eXBlcyc7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5jb25zdCBWSVRFX1BST0pFQ1RfUk9PVCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLicpO1xuXG4vLyBCbGFja2xpc3Qgb2YgY29tcG9uZW50cyB0aGF0IHNob3VsZCBub3QgYmUgZXh0cmFjdGVkICh1dGlsaXR5L25vbi12aXN1YWwgY29tcG9uZW50cylcbmNvbnN0IENPTVBPTkVOVF9CTEFDS0xJU1QgPSBuZXcgU2V0KFtcblx0J0hlbG1ldCcsXG5cdCdIZWxtZXRQcm92aWRlcicsXG5cdCdIZWFkJyxcblx0J2hlYWQnLFxuXHQnTWV0YScsXG5cdCdtZXRhJyxcblx0J1NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnTm9TY3JpcHQnLFxuXHQnbm9zY3JpcHQnLFxuXHQnU3R5bGUnLFxuXHQnc3R5bGUnLFxuXHQndGl0bGUnLFxuXHQnVGl0bGUnLFxuXHQnbGluaycsXG5cdCdMaW5rJyxcbl0pO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgZmlsZSBwYXRoIGlzIHNhZmUgdG8gYWNjZXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggLSBSZWxhdGl2ZSBmaWxlIHBhdGhcbiAqIEByZXR1cm5zIHt7IGlzVmFsaWQ6IGJvb2xlYW4sIGFic29sdXRlUGF0aD86IHN0cmluZywgZXJyb3I/OiBzdHJpbmcgfX0gLSBPYmplY3QgY29udGFpbmluZyB2YWxpZGF0aW9uIHJlc3VsdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWxlUGF0aChmaWxlUGF0aCkge1xuXHRpZiAoIWZpbGVQYXRoKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBmaWxlUGF0aCcgfTtcblx0fVxuXG5cdGNvbnN0IGFic29sdXRlRmlsZVBhdGggPSBwYXRoLnJlc29sdmUoVklURV9QUk9KRUNUX1JPT1QsIGZpbGVQYXRoKTtcblxuXHRpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4uJylcblx0XHR8fCAhYWJzb2x1dGVGaWxlUGF0aC5zdGFydHNXaXRoKFZJVEVfUFJPSkVDVF9ST09UKVxuXHRcdHx8IGFic29sdXRlRmlsZVBhdGguaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBwYXRoJyB9O1xuXHR9XG5cblx0aWYgKCFmcy5leGlzdHNTeW5jKGFic29sdXRlRmlsZVBhdGgpKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnRmlsZSBub3QgZm91bmQnIH07XG5cdH1cblxuXHRyZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCBhYnNvbHV0ZVBhdGg6IGFic29sdXRlRmlsZVBhdGggfTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBmaWxlIGludG8gYSBCYWJlbCBBU1RcbiAqIEBwYXJhbSB7c3RyaW5nfSBhYnNvbHV0ZUZpbGVQYXRoIC0gQWJzb2x1dGUgcGF0aCB0byBmaWxlXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBCYWJlbCBBU1RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmlsZVRvQVNUKGFic29sdXRlRmlsZVBhdGgpIHtcblx0Y29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhhYnNvbHV0ZUZpbGVQYXRoLCAndXRmLTgnKTtcblxuXHRyZXR1cm4gcGFyc2UoY29udGVudCwge1xuXHRcdHNvdXJjZVR5cGU6ICdtb2R1bGUnLFxuXHRcdHBsdWdpbnM6IFsnanN4JywgJ3R5cGVzY3JpcHQnXSxcblx0XHRlcnJvclJlY292ZXJ5OiB0cnVlLFxuXHR9KTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIEpTWCBvcGVuaW5nIGVsZW1lbnQgYXQgYSBzcGVjaWZpYyBsaW5lIGFuZCBjb2x1bW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhc3QgLSBCYWJlbCBBU1RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXIgKDEtaW5kZXhlZClcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyICgwLWluZGV4ZWQgZm9yIGdldC1jb2RlLWJsb2NrLCAxLWluZGV4ZWQgZm9yIGFwcGx5LWVkaXQpXG4gKiBAcmV0dXJucyB7b2JqZWN0IHwgbnVsbH0gQmFiZWwgcGF0aCB0byB0aGUgSlNYIG9wZW5pbmcgZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEpTWEVsZW1lbnRBdFBvc2l0aW9uKGFzdCwgbGluZSwgY29sdW1uKSB7XG5cdGxldCB0YXJnZXROb2RlUGF0aCA9IG51bGw7XG5cdGxldCBjbG9zZXN0Tm9kZVBhdGggPSBudWxsO1xuXHRsZXQgY2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cdGNvbnN0IGFsbE5vZGVzT25MaW5lID0gW107XG5cblx0Y29uc3QgdmlzaXRvciA9IHtcblx0XHRKU1hPcGVuaW5nRWxlbWVudChwYXRoKSB7XG5cdFx0XHRjb25zdCBub2RlID0gcGF0aC5ub2RlO1xuXHRcdFx0aWYgKG5vZGUubG9jKSB7XG5cdFx0XHRcdC8vIEV4YWN0IG1hdGNoICh3aXRoIHRvbGVyYW5jZSBmb3Igb2ZmLWJ5LW9uZSBjb2x1bW4gZGlmZmVyZW5jZXMpXG5cdFx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID09PSBsaW5lXG5cdFx0XHRcdFx0JiYgTWF0aC5hYnMobm9kZS5sb2Muc3RhcnQuY29sdW1uIC0gY29sdW1uKSA8PSAxKSB7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9kZVBhdGggPSBwYXRoO1xuXHRcdFx0XHRcdHBhdGguc3RvcCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIGFsbCBub2RlcyBvbiB0aGUgc2FtZSBsaW5lXG5cdFx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID09PSBsaW5lKSB7XG5cdFx0XHRcdFx0YWxsTm9kZXNPbkxpbmUucHVzaCh7XG5cdFx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdFx0Y29sdW1uOiBub2RlLmxvYy5zdGFydC5jb2x1bW4sXG5cdFx0XHRcdFx0XHRkaXN0YW5jZTogTWF0aC5hYnMobm9kZS5sb2Muc3RhcnQuY29sdW1uIC0gY29sdW1uKSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIGNsb3Nlc3QgbWF0Y2ggb24gdGhlIHNhbWUgbGluZSBmb3IgZmFsbGJhY2tcblx0XHRcdFx0aWYgKG5vZGUubG9jLnN0YXJ0LmxpbmUgPT09IGxpbmUpIHtcblx0XHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguYWJzKG5vZGUubG9jLnN0YXJ0LmNvbHVtbiAtIGNvbHVtbik7XG5cdFx0XHRcdFx0aWYgKGRpc3RhbmNlIDwgY2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRcdGNsb3Nlc3ROb2RlUGF0aCA9IHBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBbHNvIGNoZWNrIEpTWEVsZW1lbnQgbm9kZXMgdGhhdCBjb250YWluIHRoZSBwb3NpdGlvblxuXHRcdEpTWEVsZW1lbnQocGF0aCkge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHBhdGgubm9kZTtcblx0XHRcdGlmICghbm9kZS5sb2MpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGlzIGVsZW1lbnQgc3BhbnMgdGhlIHRhcmdldCBsaW5lIChmb3IgbXVsdGktbGluZSBlbGVtZW50cylcblx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID4gbGluZSB8fCBub2RlLmxvYy5lbmQubGluZSA8IGxpbmUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSdyZSBpbnNpZGUgdGhpcyBlbGVtZW50J3MgcmFuZ2UsIGNvbnNpZGVyIGl0cyBvcGVuaW5nIGVsZW1lbnRcblx0XHRcdGlmICghcGF0aC5ub2RlLm9wZW5pbmdFbGVtZW50Py5sb2MpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBvcGVuaW5nTGluZSA9IHBhdGgubm9kZS5vcGVuaW5nRWxlbWVudC5sb2Muc3RhcnQubGluZTtcblx0XHRcdGNvbnN0IG9wZW5pbmdDb2wgPSBwYXRoLm5vZGUub3BlbmluZ0VsZW1lbnQubG9jLnN0YXJ0LmNvbHVtbjtcblxuXHRcdFx0Ly8gUHJlZmVyIGVsZW1lbnRzIHRoYXQgc3RhcnQgb24gdGhlIGV4YWN0IGxpbmVcblx0XHRcdGlmIChvcGVuaW5nTGluZSA9PT0gbGluZSkge1xuXHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguYWJzKG9wZW5pbmdDb2wgLSBjb2x1bW4pO1xuXHRcdFx0XHRpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRjbG9zZXN0Tm9kZVBhdGggPSBwYXRoLmdldCgnb3BlbmluZ0VsZW1lbnQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhhbmRsZSBlbGVtZW50cyB0aGF0IHN0YXJ0IGJlZm9yZSB0aGUgdGFyZ2V0IGxpbmVcblx0XHRcdGlmIChvcGVuaW5nTGluZSA8IGxpbmUpIHtcblx0XHRcdFx0Y29uc3QgZGlzdGFuY2UgPSAobGluZSAtIG9wZW5pbmdMaW5lKSAqIDEwMDsgLy8gUGVuYWxpemUgYnkgbGluZSBkaXN0YW5jZVxuXHRcdFx0XHRpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRjbG9zZXN0Tm9kZVBhdGggPSBwYXRoLmdldCgnb3BlbmluZ0VsZW1lbnQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG5cblx0dHJhdmVyc2VCYWJlbC5kZWZhdWx0KGFzdCwgdmlzaXRvcik7XG5cblx0Ly8gUmV0dXJuIGV4YWN0IG1hdGNoIGlmIGZvdW5kLCBvdGhlcndpc2UgcmV0dXJuIGNsb3Nlc3QgbWF0Y2ggaWYgd2l0aGluIHJlYXNvbmFibGUgZGlzdGFuY2Vcblx0Ly8gVXNlIGxhcmdlciB0aHJlc2hvbGQgKDUwIGNoYXJzKSBmb3Igc2FtZS1saW5lIGVsZW1lbnRzLCA1IGxpbmVzIGZvciBtdWx0aS1saW5lIGVsZW1lbnRzXG5cdGNvbnN0IHRocmVzaG9sZCA9IGNsb3Nlc3REaXN0YW5jZSA8IDEwMCA/IDUwIDogNTAwO1xuXHRyZXR1cm4gdGFyZ2V0Tm9kZVBhdGggfHwgKGNsb3Nlc3REaXN0YW5jZSA8PSB0aHJlc2hvbGQgPyBjbG9zZXN0Tm9kZVBhdGggOiBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBKU1ggZWxlbWVudCBuYW1lIGlzIGJsYWNrbGlzdGVkXG4gKiBAcGFyYW0ge29iamVjdH0ganN4T3BlbmluZ0VsZW1lbnQgLSBCYWJlbCBKU1ggb3BlbmluZyBlbGVtZW50IG5vZGVcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGJsYWNrbGlzdGVkXG4gKi9cbmZ1bmN0aW9uIGlzQmxhY2tsaXN0ZWRDb21wb25lbnQoanN4T3BlbmluZ0VsZW1lbnQpIHtcblx0aWYgKCFqc3hPcGVuaW5nRWxlbWVudCB8fCAhanN4T3BlbmluZ0VsZW1lbnQubmFtZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEhhbmRsZSBKU1hJZGVudGlmaWVyIChlLmcuLCA8SGVsbWV0Pilcblx0aWYgKGlzSlNYSWRlbnRpZmllcihqc3hPcGVuaW5nRWxlbWVudC5uYW1lKSkge1xuXHRcdHJldHVybiBDT01QT05FTlRfQkxBQ0tMSVNULmhhcyhqc3hPcGVuaW5nRWxlbWVudC5uYW1lLm5hbWUpO1xuXHR9XG5cblx0Ly8gSGFuZGxlIEpTWE1lbWJlckV4cHJlc3Npb24gKGUuZy4sIDxSZWFjdC5GcmFnbWVudD4pXG5cdGlmIChpc0pTWE1lbWJlckV4cHJlc3Npb24oanN4T3BlbmluZ0VsZW1lbnQubmFtZSkpIHtcblx0XHRsZXQgY3VycmVudCA9IGpzeE9wZW5pbmdFbGVtZW50Lm5hbWU7XG5cdFx0d2hpbGUgKGlzSlNYTWVtYmVyRXhwcmVzc2lvbihjdXJyZW50KSkge1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucHJvcGVydHk7XG5cdFx0fVxuXHRcdGlmIChpc0pTWElkZW50aWZpZXIoY3VycmVudCkpIHtcblx0XHRcdHJldHVybiBDT01QT05FTlRfQkxBQ0tMSVNULmhhcyhjdXJyZW50Lm5hbWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgY29kZSBmcm9tIGFuIEFTVCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIEJhYmVsIEFTVCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIEdlbmVyYXRvciBvcHRpb25zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBHZW5lcmF0ZWQgY29kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKG5vZGUsIG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCBnZW5lcmF0ZUZ1bmN0aW9uID0gZ2VuZXJhdGUuZGVmYXVsdCB8fCBnZW5lcmF0ZTtcblx0Y29uc3Qgb3V0cHV0ID0gZ2VuZXJhdGVGdW5jdGlvbihub2RlLCBvcHRpb25zKTtcblx0cmV0dXJuIG91dHB1dC5jb2RlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZ1bGwgc291cmNlIGZpbGUgZnJvbSBBU1Qgd2l0aCBzb3VyY2UgbWFwc1xuICogQHBhcmFtIHtvYmplY3R9IGFzdCAtIEJhYmVsIEFTVFxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZUZpbGVOYW1lIC0gU291cmNlIGZpbGUgbmFtZSBmb3Igc291cmNlIG1hcFxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsQ29kZSAtIE9yaWdpbmFsIHNvdXJjZSBjb2RlXG4gKiBAcmV0dXJucyB7e2NvZGU6IHN0cmluZywgbWFwOiBvYmplY3R9fSAtIE9iamVjdCBjb250YWluaW5nIGdlbmVyYXRlZCBjb2RlIGFuZCBzb3VyY2UgbWFwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNvdXJjZVdpdGhNYXAoYXN0LCBzb3VyY2VGaWxlTmFtZSwgb3JpZ2luYWxDb2RlKSB7XG5cdGNvbnN0IGdlbmVyYXRlRnVuY3Rpb24gPSBnZW5lcmF0ZS5kZWZhdWx0IHx8IGdlbmVyYXRlO1xuXHRyZXR1cm4gZ2VuZXJhdGVGdW5jdGlvbihhc3QsIHtcblx0XHRzb3VyY2VNYXBzOiB0cnVlLFxuXHRcdHNvdXJjZUZpbGVOYW1lLFxuXHR9LCBvcmlnaW5hbENvZGUpO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIGNvZGUgYmxvY2tzIGZyb20gYSBKU1ggZWxlbWVudCBhdCBhIHNwZWNpZmljIGxvY2F0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggLSBSZWxhdGl2ZSBmaWxlIHBhdGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyXG4gKiBAcGFyYW0ge29iamVjdH0gW2RvbUNvbnRleHRdIC0gT3B0aW9uYWwgRE9NIGNvbnRleHQgdG8gcmV0dXJuIG9uIGZhaWx1cmVcbiAqIEByZXR1cm5zIHt7c3VjY2VzczogYm9vbGVhbiwgZmlsZVBhdGg/OiBzdHJpbmcsIHNwZWNpZmljTGluZT86IHN0cmluZywgZXJyb3I/OiBzdHJpbmcsIGRvbUNvbnRleHQ/OiBvYmplY3R9fSAtIE9iamVjdCB3aXRoIG1ldGFkYXRhIGZvciBMTE1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb2RlQmxvY2tzKGZpbGVQYXRoLCBsaW5lLCBjb2x1bW4sIGRvbUNvbnRleHQpIHtcblx0dHJ5IHtcblx0XHQvLyBWYWxpZGF0ZSBmaWxlIHBhdGhcblx0XHRjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVGaWxlUGF0aChmaWxlUGF0aCk7XG5cdFx0aWYgKCF2YWxpZGF0aW9uLmlzVmFsaWQpIHtcblx0XHRcdHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdmFsaWRhdGlvbi5lcnJvciwgZG9tQ29udGV4dCB9O1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIEFTVFxuXHRcdGNvbnN0IGFzdCA9IHBhcnNlRmlsZVRvQVNUKHZhbGlkYXRpb24uYWJzb2x1dGVQYXRoKTtcblxuXHRcdC8vIEZpbmQgdGFyZ2V0IG5vZGVcblx0XHRjb25zdCB0YXJnZXROb2RlUGF0aCA9IGZpbmRKU1hFbGVtZW50QXRQb3NpdGlvbihhc3QsIGxpbmUsIGNvbHVtbik7XG5cblx0XHRpZiAoIXRhcmdldE5vZGVQYXRoKSB7XG5cdFx0XHRyZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdUYXJnZXQgbm9kZSBub3QgZm91bmQgYXQgc3BlY2lmaWVkIGxpbmUvY29sdW1uJywgZG9tQ29udGV4dCB9O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoZSB0YXJnZXQgbm9kZSBpcyBhIGJsYWNrbGlzdGVkIGNvbXBvbmVudFxuXHRcdGNvbnN0IGlzQmxhY2tsaXN0ZWQgPSBpc0JsYWNrbGlzdGVkQ29tcG9uZW50KHRhcmdldE5vZGVQYXRoLm5vZGUpO1xuXG5cdFx0aWYgKGlzQmxhY2tsaXN0ZWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHRcdGZpbGVQYXRoLFxuXHRcdFx0XHRzcGVjaWZpY0xpbmU6ICcnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBHZXQgc3BlY2lmaWMgbGluZSBjb2RlXG5cdFx0Y29uc3Qgc3BlY2lmaWNMaW5lID0gZ2VuZXJhdGVDb2RlKHRhcmdldE5vZGVQYXRoLnBhcmVudFBhdGg/Lm5vZGUgfHwgdGFyZ2V0Tm9kZVBhdGgubm9kZSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdGZpbGVQYXRoLFxuXHRcdFx0c3BlY2lmaWNMaW5lLFxuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcignW2FzdC11dGlsc10gRXJyb3IgZXh0cmFjdGluZyBjb2RlIGJsb2NrczonLCBlcnJvcik7XG5cdFx0cmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIGV4dHJhY3QgY29kZSBibG9ja3MnLCBkb21Db250ZXh0IH07XG5cdH1cbn1cblxuLyoqXG4gKiBQcm9qZWN0IHJvb3QgcGF0aFxuICovXG5leHBvcnQgeyBWSVRFX1BST0pFQ1RfUk9PVCB9O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmYWJyaVxcXFxPbmVEcml2ZVxcXFxCdXJlYXVcXFxcUE9XQUxZWkUgRklOQUxcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmYWJyaVxcXFxPbmVEcml2ZVxcXFxCdXJlYXVcXFxcUE9XQUxZWkUgRklOQUxcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXFxcXHZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZmFicmkvT25lRHJpdmUvQnVyZWF1L1BPV0FMWVpFJTIwRklOQUwvcGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qc1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgRURJVF9NT0RFX1NUWUxFUyB9IGZyb20gJy4vdmlzdWFsLWVkaXRvci1jb25maWcnO1xuXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3QgX19kaXJuYW1lID0gcmVzb2x2ZShfX2ZpbGVuYW1lLCAnLi4nKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5saW5lRWRpdERldlBsdWdpbigpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAndml0ZTppbmxpbmUtZWRpdC1kZXYnLFxuXHRcdGFwcGx5OiAnc2VydmUnLFxuXHRcdHRyYW5zZm9ybUluZGV4SHRtbCgpIHtcblx0XHRcdGNvbnN0IHNjcmlwdFBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJ2VkaXQtbW9kZS1zY3JpcHQuanMnKTtcblx0XHRcdGNvbnN0IHNjcmlwdENvbnRlbnQgPSByZWFkRmlsZVN5bmMoc2NyaXB0UGF0aCwgJ3V0Zi04Jyk7XG5cblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0YWc6ICdzY3JpcHQnLFxuXHRcdFx0XHRcdGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnIH0sXG5cdFx0XHRcdFx0Y2hpbGRyZW46IHNjcmlwdENvbnRlbnQsXG5cdFx0XHRcdFx0aW5qZWN0VG86ICdib2R5J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGFnOiAnc3R5bGUnLFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBFRElUX01PREVfU1RZTEVTLFxuXHRcdFx0XHRcdGluamVjdFRvOiAnaGVhZCdcblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHR9XG5cdH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFxcXFxwbHVnaW5zXFxcXHZpc3VhbC1lZGl0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFxcXFxwbHVnaW5zXFxcXHZpc3VhbC1lZGl0b3JcXFxcdmlzdWFsLWVkaXRvci1jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2ZhYnJpL09uZURyaXZlL0J1cmVhdS9QT1dBTFlaRSUyMEZJTkFML3BsdWdpbnMvdmlzdWFsLWVkaXRvci92aXN1YWwtZWRpdG9yLWNvbmZpZy5qc1wiO2V4cG9ydCBjb25zdCBQT1BVUF9TVFlMRVMgPSBgXG4jaW5saW5lLWVkaXRvci1wb3B1cCB7XG5cdHdpZHRoOiAzNjBweDtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR6LWluZGV4OiAxMDAwMDtcblx0YmFja2dyb3VuZDogIzE2MTcxODtcblx0Y29sb3I6IHdoaXRlO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjNGE1NTY4O1xuXHRib3JkZXItcmFkaXVzOiAxNnB4O1xuXHRwYWRkaW5nOiA4cHg7XG5cdGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjIpO1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRnYXA6IDEwcHg7XG5cdGRpc3BsYXk6IG5vbmU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuXHQjaW5saW5lLWVkaXRvci1wb3B1cCB7XG5cdFx0d2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuXHR9XG59XG5cbiNpbmxpbmUtZWRpdG9yLXBvcHVwLmlzLWFjdGl2ZSB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdHRvcDogNTAlO1xuXHRsZWZ0OiA1MCU7XG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cC5pcy1kaXNhYmxlZC12aWV3IHtcblx0cGFkZGluZzogMTBweCAxNXB4O1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cCB0ZXh0YXJlYSB7XG5cdGhlaWdodDogMTAwcHg7XG5cdHBhZGRpbmc6IDRweCA4cHg7XG5cdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXHRjb2xvcjogd2hpdGU7XG5cdGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuXHRmb250LXNpemU6IDAuODc1cmVtO1xuXHRsaW5lLWhlaWdodDogMS40Mjtcblx0cmVzaXplOiBub25lO1xuXHRvdXRsaW5lOiBub25lO1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cCAuYnV0dG9uLWNvbnRhaW5lciB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cdGdhcDogMTBweDtcbn1cblxuI2lubGluZS1lZGl0b3ItcG9wdXAgLnBvcHVwLWJ1dHRvbiB7XG5cdGJvcmRlcjogbm9uZTtcblx0cGFkZGluZzogNnB4IDE2cHg7XG5cdGJvcmRlci1yYWRpdXM6IDhweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRmb250LXNpemU6IDAuNzVyZW07XG5cdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdGhlaWdodDogMzRweDtcblx0b3V0bGluZTogbm9uZTtcbn1cblxuI2lubGluZS1lZGl0b3ItcG9wdXAgLnNhdmUtYnV0dG9uIHtcblx0YmFja2dyb3VuZDogIzY3M2RlNjtcblx0Y29sb3I6IHdoaXRlO1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cCAuY2FuY2VsLWJ1dHRvbiB7XG5cdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXHRib3JkZXI6IDFweCBzb2xpZCAjM2IzZDRhO1xuXHRjb2xvcjogd2hpdGU7XG5cblx0Jjpob3ZlciB7XG5cdGJhY2tncm91bmQ6IzQ3NDk1ODtcblx0fVxufVxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcHVwSFRNTFRlbXBsYXRlKHNhdmVMYWJlbCwgY2FuY2VsTGFiZWwpIHtcblx0cmV0dXJuIGBcblx0PHRleHRhcmVhPjwvdGV4dGFyZWE+XG5cdDxkaXYgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCI+XG5cdFx0PGJ1dHRvbiBjbGFzcz1cInBvcHVwLWJ1dHRvbiBjYW5jZWwtYnV0dG9uXCI+JHtjYW5jZWxMYWJlbH08L2J1dHRvbj5cblx0XHQ8YnV0dG9uIGNsYXNzPVwicG9wdXAtYnV0dG9uIHNhdmUtYnV0dG9uXCI+JHtzYXZlTGFiZWx9PC9idXR0b24+XG5cdDwvZGl2PlxuXHRgO1xufVxuXG5leHBvcnQgY29uc3QgRURJVF9NT0RFX1NUWUxFUyA9IGBcblx0I3Jvb3RbZGF0YS1lZGl0LW1vZGUtZW5hYmxlZD1cInRydWVcIl0gW2RhdGEtZWRpdC1pZF0ge1xuXHRcdGN1cnNvcjogcG9pbnRlcjsgXG5cdFx0b3V0bGluZTogMnB4IGRhc2hlZCAjMzU3REY5OyBcblx0XHRvdXRsaW5lLW9mZnNldDogMnB4O1xuXHRcdG1pbi1oZWlnaHQ6IDFlbTtcblx0fVxuXHQjcm9vdFtkYXRhLWVkaXQtbW9kZS1lbmFibGVkPVwidHJ1ZVwiXSBpbWdbZGF0YS1lZGl0LWlkXSB7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC0ycHg7XG5cdH1cblx0I3Jvb3RbZGF0YS1lZGl0LW1vZGUtZW5hYmxlZD1cInRydWVcIl0ge1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0fVxuXHQjcm9vdFtkYXRhLWVkaXQtbW9kZS1lbmFibGVkPVwidHJ1ZVwiXSBbZGF0YS1lZGl0LWlkXTpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzM1N0RGOTMzO1xuXHRcdG91dGxpbmUtY29sb3I6ICMzNTdERjk7IFxuXHR9XG5cblx0QGtleWZyYW1lcyBmYWRlSW5Ub29sdGlwIHtcblx0XHRmcm9tIHtcblx0XHRcdG9wYWNpdHk6IDA7XG5cdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcblx0XHR9XG5cdFx0dG8ge1xuXHRcdFx0b3BhY2l0eTogMTtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcblx0XHR9XG5cdH1cblxuXHQjaW5saW5lLWVkaXRvci1kaXNhYmxlZC10b29sdGlwIHtcblx0XHRkaXNwbGF5OiBub25lOyBcblx0XHRvcGFjaXR5OiAwOyBcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzFEMUUyMDtcblx0XHRjb2xvcjogd2hpdGU7XG5cdFx0cGFkZGluZzogNHB4IDhweDtcblx0XHRib3JkZXItcmFkaXVzOiA4cHg7XG5cdFx0ei1pbmRleDogMTAwMDE7XG5cdFx0Zm9udC1zaXplOiAxNHB4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMzQjNENEE7XG5cdFx0bWF4LXdpZHRoOiAxODRweDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblxuXHQjaW5saW5lLWVkaXRvci1kaXNhYmxlZC10b29sdGlwLnRvb2x0aXAtYWN0aXZlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRhbmltYXRpb246IGZhZGVJblRvb2x0aXAgMC4ycyBlYXNlLW91dCBmb3J3YXJkcztcblx0fVxuYDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmFicmlcXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXFBPV0FMWVpFIEZJTkFMXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFxcXFxwbHVnaW5zXFxcXHZpdGUtcGx1Z2luLWlmcmFtZS1yb3V0ZS1yZXN0b3JhdGlvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZmFicmkvT25lRHJpdmUvQnVyZWF1L1BPV0FMWVpFJTIwRklOQUwvcGx1Z2lucy92aXRlLXBsdWdpbi1pZnJhbWUtcm91dGUtcmVzdG9yYXRpb24uanNcIjtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZnJhbWVSb3V0ZVJlc3RvcmF0aW9uUGx1Z2luKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlOmlmcmFtZS1yb3V0ZS1yZXN0b3JhdGlvbicsXG4gICAgYXBwbHk6ICdzZXJ2ZScsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sKCkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gYFxuICAgICAgY29uc3QgQUxMT1dFRF9QQVJFTlRfT1JJR0lOUyA9IFtcbiAgICAgICAgICBcImh0dHBzOi8vaG9yaXpvbnMuaG9zdGluZ2VyLmNvbVwiLFxuICAgICAgICAgIFwiaHR0cHM6Ly9ob3Jpem9ucy5ob3N0aW5nZXIuZGV2XCIsXG4gICAgICAgICAgXCJodHRwczovL2hvcml6b25zLWZyb250ZW5kLWxvY2FsLmhvc3Rpbmdlci5kZXZcIixcbiAgICAgIF07XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBwYWdlIGlzIGluIGFuIGlmcmFtZVxuICAgICAgICBpZiAod2luZG93LnNlbGYgIT09IHdpbmRvdy50b3ApIHtcbiAgICAgICAgICBjb25zdCBTVE9SQUdFX0tFWSA9ICdob3Jpem9ucy1pZnJhbWUtc2F2ZWQtcm91dGUnO1xuXG4gICAgICAgICAgY29uc3QgZ2V0Q3VycmVudFJvdXRlID0gKCkgPT4gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoO1xuXG4gICAgICAgICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3V0ZSA9IGdldEN1cnJlbnRSb3V0ZSgpO1xuICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBjdXJyZW50Um91dGUpO1xuICAgICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHttZXNzYWdlOiAncm91dGUtY2hhbmdlZCcsIHJvdXRlOiBjdXJyZW50Um91dGV9LCAnKicpO1xuICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXBsYWNlSGlzdG9yeVN0YXRlID0gKHVybCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHVybCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBQb3BTdGF0ZUV2ZW50KCdwb3BzdGF0ZScsIHsgc3RhdGU6IGhpc3Rvcnkuc3RhdGUgfSkpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG4gICAgICAgICAgICAgIGlmICghc2F2ZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICBpZiAoIXNhdmVkLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50Um91dGUoKTtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IHNhdmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXBsYWNlSGlzdG9yeVN0YXRlKHNhdmVkKSkge1xuICAgICAgICAgICAgICAgICAgcmVwbGFjZUhpc3RvcnlTdGF0ZSgnLycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSAoZG9jdW1lbnQuYm9keT8uaW5uZXJUZXh0IHx8ICcnKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3RvcmVkIHJvdXRlIHJlc3VsdHMgaW4gdG9vIGxpdHRsZSBjb250ZW50LCBhc3N1bWUgaXQgaXMgaW52YWxpZCBhbmQgbmF2aWdhdGUgaG9tZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VIaXN0b3J5U3RhdGUoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgICAgICAgIH0sIDEwMDApKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvcmlnaW5hbFB1c2hTdGF0ZSA9IGhpc3RvcnkucHVzaFN0YXRlO1xuICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICAgICAgb3JpZ2luYWxQdXNoU3RhdGUuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUmVwbGFjZVN0YXRlID0gaGlzdG9yeS5yZXBsYWNlU3RhdGU7XG4gICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFJlcGxhY2VTdGF0ZS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgZ2V0UGFyZW50T3JpZ2luID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYW5jZXN0b3JPcmlnaW5zICYmXG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYW5jZXN0b3JPcmlnaW5zLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmFuY2VzdG9yT3JpZ2luc1swXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlcikge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVSTChkb2N1bWVudC5yZWZlcnJlcikub3JpZ2luO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkludmFsaWQgcmVmZXJyZXIgVVJMOlwiLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2F2ZSk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBzYXZlKTtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcmVudE9yaWdpbiA9IGdldFBhcmVudE9yaWdpbigpO1xuXG4gICAgICAgICAgICAgIGlmIChldmVudC5kYXRhPy50eXBlID09PSBcInJlZGlyZWN0LWhvbWVcIiAmJiBwYXJlbnRPcmlnaW4gJiYgQUxMT1dFRF9QQVJFTlRfT1JJR0lOUy5pbmNsdWRlcyhwYXJlbnRPcmlnaW4pKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKTtcblxuICAgICAgICAgICAgICAgIGlmKHNhdmVkICYmIHNhdmVkICE9PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGxhY2VIaXN0b3J5U3RhdGUoJy8nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICBgO1xuXG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiAnbW9kdWxlJyB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBzY3JpcHQsXG4gICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICB9XG4gICAgICBdO1xuICAgIH1cbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmFicmlcXFxcT25lRHJpdmVcXFxcQnVyZWF1XFxcXFBPV0FMWVpFIEZJTkFMXFxcXHBsdWdpbnNcXFxcc2VsZWN0aW9uLW1vZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZhYnJpXFxcXE9uZURyaXZlXFxcXEJ1cmVhdVxcXFxQT1dBTFlaRSBGSU5BTFxcXFxwbHVnaW5zXFxcXHNlbGVjdGlvbi1tb2RlXFxcXHZpdGUtcGx1Z2luLXNlbGVjdGlvbi1tb2RlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mYWJyaS9PbmVEcml2ZS9CdXJlYXUvUE9XQUxZWkUlMjBGSU5BTC9wbHVnaW5zL3NlbGVjdGlvbi1tb2RlL3ZpdGUtcGx1Z2luLXNlbGVjdGlvbi1tb2RlLmpzXCI7aW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSByZXNvbHZlKF9fZmlsZW5hbWUsICcuLicpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3Rpb25Nb2RlUGx1Z2luKCkge1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICd2aXRlOnNlbGVjdGlvbi1tb2RlJyxcblx0XHRhcHBseTogJ3NlcnZlJyxcblxuXHRcdHRyYW5zZm9ybUluZGV4SHRtbCgpIHtcblx0XHRcdGNvbnN0IHNjcmlwdFBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NlbGVjdGlvbi1tb2RlLXNjcmlwdC5qcycpO1xuXHRcdFx0Y29uc3Qgc2NyaXB0Q29udGVudCA9IHJlYWRGaWxlU3luYyhzY3JpcHRQYXRoLCAndXRmLTgnKTtcblxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRhZzogJ3NjcmlwdCcsXG5cdFx0XHRcdFx0YXR0cnM6IHsgdHlwZTogJ21vZHVsZScgfSxcblx0XHRcdFx0XHRjaGlsZHJlbjogc2NyaXB0Q29udGVudCxcblx0XHRcdFx0XHRpbmplY3RUbzogJ2JvZHknLFxuXHRcdFx0XHR9LFxuXHRcdFx0XTtcblx0XHR9LFxuXHR9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VSxPQUFPQSxXQUFVO0FBQ3hWLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWMsb0JBQW9COzs7QUNGMFksT0FBT0MsV0FBVTtBQUN0YyxTQUFTLFNBQUFDLGNBQWE7QUFDdEIsT0FBT0Msb0JBQW1CO0FBQzFCLFlBQVksT0FBTztBQUNuQixPQUFPQyxTQUFROzs7QUNKa1csT0FBTyxRQUFRO0FBQ2hZLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLGNBQWM7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VUFDdEM7QUFBQSxVQUNBLFVBQVU7QUFBQSxRQUNYO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFFQSxXQUFPO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEO0FBRUEsUUFBUSxPQUFPLE1BQU07QUFBQztBQUV0QixJQUFNLFNBQVMsYUFBYTtBQUM1QixJQUFNLGNBQWMsT0FBTztBQUUzQixPQUFPLFFBQVEsQ0FBQyxLQUFLLFlBQVk7QUFuT2pDO0FBb09DLE9BQUksd0NBQVMsVUFBVCxtQkFBZ0IsV0FBVyxTQUFTLDhCQUE4QjtBQUNyRTtBQUFBLEVBQ0Q7QUFFQSxjQUFZLEtBQUssT0FBTztBQUN6QjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLGNBQWM7QUFBQSxFQUNkLFNBQVM7QUFBQSxJQUNSLEdBQUksUUFBUSxDQUFDLGlCQUFpQixHQUFHLG9CQUFrQixHQUFHLDZCQUE2QixHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztBQUFBLElBQ2hILE1BQU07QUFBQSxJQUNOO0FBQUEsRUFDRDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1IsZ0NBQWdDO0FBQUEsSUFDakM7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixZQUFZLENBQUMsUUFBUSxPQUFPLFFBQVEsT0FBTyxPQUFTO0FBQUEsSUFDcEQsT0FBTztBQUFBLE1BQ04sS0FBS0MsTUFBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNyQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLGVBQWU7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJwYXRoIiwgInBhcnNlIiwgInRyYXZlcnNlQmFiZWwiLCAiZnMiLCAiX19kaXJuYW1lIiwgInBhdGgiLCAicGF0aCIsICJwYXJzZSIsICJ0cmF2ZXJzZUJhYmVsIiwgImZzIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJfX2ZpbGVuYW1lIiwgImZpbGVVUkxUb1BhdGgiLCAiX19kaXJuYW1lIiwgInJlYWRGaWxlU3luYyIsICJyZXNvbHZlIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJfX2ZpbGVuYW1lIiwgImZpbGVVUkxUb1BhdGgiLCAiX19kaXJuYW1lIiwgInJlc29sdmUiLCAicmVhZEZpbGVTeW5jIiwgInBhdGgiXQp9Cg==
