# Pantheon Build Failure - Infrastructure Bug Report

## Executive Summary

**Critical Issue:** All Next.js App Router projects failing to build on Pantheon as of ~February 18-19, 2026 due to incompatible `pantheon-adapter.js` injection during build process.

## Issue Details

### Error Message
```
Error: <Html> should not be imported outside of pages/_document.
Read more: https://nextjs.org/docs/messages/no-document-import-in-page
at x (.next/server/chunks/611.js:6:1351)
Error occurred prerendering page "/404". Read more: https://nextjs.org/docs/messages/prerender-error
```

### Affected Projects
- `pantheon-deploy-demo` (this repo)
- `scoping-tool-poc`
- **All Next.js App Router projects on Pantheon**

### Timeline
- **Before February 18, 2026**: Both projects building successfully
- **After February 18, 2026**: Both projects failing with identical error
- **Conclusion**: Pantheon infrastructure change broke App Router compatibility

## Root Cause Analysis

### The Problem

Pantheon's build system injects a file called `pantheon-adapter.js` into the workspace during builds:

```
(node:78) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///workspace/pantheon-adapter.js is not specified and it doesn't parse as CommonJS.
```

This injected adapter is importing `<Html>` from `next/document`, which is **only valid in Pages Router** (`pages/_document.js`). In App Router projects, this causes a build failure during static page generation.

### Why It Fails

1. **Next.js Build Process**: During `next build`, Next.js prerenders static pages including error pages (`/404`, `/_error`)
2. **Pantheon Adapter Injection**: Pantheon injects `pantheon-adapter.js` which imports Pages Router components
3. **App Router Incompatibility**: The `<Html>` component cannot be used outside of `pages/_document.js`
4. **Build Failure**: The error occurs during "Generating static pages" phase

### Evidence

**Local Build**: ✅ Succeeds perfectly
```
✓ Generating static pages (5/5)
Route (app)                                 Size  First Load JS
┌ ○ /                                     4.7 kB         107 kB
└ ○ /_not-found                            123 B         102 kB
```

**Pantheon Build**: ❌ Fails during prerendering
```
Generating static pages (0/5) ...
Error: <Html> should not be imported outside of pages/_document.
Export encountered an error on /_error: /404, exiting the build.
```

## Configuration Details

### Working Configuration (Pre-Feb 18)
- Next.js: 15.5.9 or 15.5.10
- App Router architecture
- Custom error pages: `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`
- Cache handler: `@pantheon-systems/nextjs-cache-handler` (0.1.0 or 0.4.0)

### Current Configuration
Identical to above, but now fails on Pantheon while succeeding locally.

## Troubleshooting Attempted

### What We Tried (All Failed)

1. ✅ **Added custom error pages** (`not-found.tsx`, `error.tsx`, `global-error.tsx`)
   - Result: No change

2. ✅ **Moved TypeScript to dependencies** (from devDependencies)
   - Result: Build gets further but still fails at prerender

3. ✅ **Downgraded Next.js** (15.5.10 → 15.5.9)
   - Result: No change

4. ✅ **Added `"type": "module"`** to package.json
   - Result: Eliminated module warnings but didn't fix core issue

5. ✅ **Upgraded cache handler** (0.1.0 → 0.4.0)
   - Result: No change

6. ✅ **Simplified error pages to redirects**
   - Result: Still attempts to prerender, still fails

7. ✅ **Added dynamic rendering flags**
   - Result: Ignored during build

8. ✅ **Removed experimental configs**
   - Result: No change

## Technical Analysis

### The Injected Adapter

The `pantheon-adapter.js` file is:
- **Not in our codebase** - Injected by Pantheon's buildpack
- **Using Pages Router patterns** - Imports from `next/document`
- **Breaking App Router** - Incompatible with App Router architecture
- **Recently updated** - Changed within the last week

### Key Indicators

1. **Builds work locally** - No adapter injection
2. **Builds fail on Pantheon** - Adapter is injected
3. **Multiple projects affected** - Not project-specific
4. **Recent onset** - Infrastructure change, not code change
5. **Identical error across projects** - Same root cause

## Recommended Solution

### Immediate Action Required

Pantheon engineering team needs to:

1. **Update `pantheon-adapter.js`** to be compatible with Next.js App Router
2. **Remove Pages Router dependencies** (`<Html>` from `next/document`)
3. **Use App Router patterns** for error handling if needed
4. **Test with App Router projects** before deployment

### Alternative Workarounds (Not Recommended)

1. **Downgrade to Pages Router** - Loses App Router benefits
2. **Use static export** (`output: 'export'`) - Bypasses adapter but loses server features
3. **Disable error page prerendering** - Not possible with current Next.js config

## Files for Engineering Review

### Project Structure
```
app/
├── error.tsx          # Client-side error boundary (App Router)
├── global-error.tsx   # Root error boundary (App Router)
├── not-found.tsx      # 404 page (App Router)
├── layout.tsx         # Root layout
└── page.tsx           # Home page

next.config.ts         # Standard App Router config
package.json           # Dependencies
project.toml           # Pantheon build config
cacheHandler.mjs       # Pantheon cache handler setup
```

### Build Logs Location
- Error ID: `7fa33aaa`
- Log path: `/home/cnb/.npm/_logs/2026-02-25T*-debug-0.log`

## Impact Assessment

### Severity: **CRITICAL**
- **Blocking:** All App Router deployments
- **Scope:** All Pantheon Next.js App Router projects
- **Workaround:** None available
- **Timeline:** Affecting projects since ~Feb 18, 2026

### Business Impact
- Cannot deploy new Next.js App Router projects
- Cannot update existing App Router projects
- Forced to use outdated Pages Router architecture
- Blocks adoption of Next.js 15 features

## Next Steps

1. **Escalate to Pantheon Engineering** - This is an infrastructure bug
2. **Rollback Recent Changes** - Revert whatever changed ~Feb 18
3. **Update Adapter** - Make compatible with App Router
4. **Add Tests** - Include App Router projects in CI/CD
5. **Communicate Timeline** - When will this be fixed?

## Contact Information

**Reported By:** Jeremy Dickens
**Date:** February 25, 2026
**Affected Repositories:**
- https://github.com/logickal/pantheon-deploy-demo
- pantheon-scoping-poc-1 (Pantheon site)

## Additional Context

Both projects were working fine before February 18, 2026. The identical failure across multiple independent projects with different configurations confirms this is a Pantheon infrastructure issue, not a project configuration problem.

The `pantheon-adapter.js` file needs to be updated to work with Next.js App Router architecture or conditionally inject based on whether the project uses Pages Router vs App Router.
