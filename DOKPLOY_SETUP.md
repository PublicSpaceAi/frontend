# Dokploy Setup Troubleshooting

## Error: "failed to read dockerfile: read /var/lib/docker/tmp/buildkit-mount1931437029/code: is a directory"

This error occurs when Dokploy's build configuration is pointing to a directory instead of the Dockerfile file.

## Solution:

### Step 1: In Dokploy Dashboard
1. Go to your application settings
2. Find the **Build Configuration** section
3. Look for **Dockerfile path** or **Build file** setting

### Step 2: Set Correct Dockerfile Path
- **If using root Dockerfile:** Set to `./Dockerfile` or just `Dockerfile`
- **NOT:** `/code` or `/code/Dockerfile`

### Step 3: Verify Build Settings
Ensure these are set correctly in Dokploy:
- ✅ **Build Type:** Docker
- ✅ **Dockerfile:** `Dockerfile` (or `./Dockerfile`)
- ✅ **Build Context:** `.` (root directory)
- ✅ **Source:** GitHub (github.com/PublicSpaceAi/frontend)
- ✅ **Port:** 3002

### Step 4: Environment Variables
Make sure these are set in Dokploy:
- `NEXTAUTH_URL=https://your-domain.com` (or http://localhost:3002 for testing)
- `NEXTAUTH_SECRET=your-secret-key`
- `NODE_ENV=production`

### Step 5: Rebuild
1. Click **Rebuild** or **Deploy** in Dokploy
2. Monitor the logs

## If Still Failing:

### Option A: Use Nixpacks Instead
If Docker is giving issues, switch to Nixpacks:
1. In Dokploy, change build type to **Nixpacks**
2. It will automatically detect and use `nixpacks.json`

### Option B: Manual Docker Build Command
Try building locally first to ensure it works:
```bash
cd /path/to/frontend
docker build -t ps-ai-frontend:latest -f Dockerfile .
docker run -p 3002:3002 ps-ai-frontend:latest
```

### Option C: Check File Paths
Ensure your Dockerfile exists at the root:
```bash
ls -la Dockerfile     # Should show the file
ls -la .dockerignore  # Should exist
ls -la nixpacks.json  # Should exist
```

## Dokploy Configuration Checklist

- [ ] Repository cloned successfully
- [ ] Dockerfile location set to `Dockerfile` (not a directory)
- [ ] Build context set to `.` (current directory)
- [ ] Build type is Docker (not Dockerfile: /code)
- [ ] Environment variables configured
- [ ] Port 3002 is exposed
- [ ] Health check enabled (optional)
- [ ] Memory/CPU limits reasonable

## Common Mistakes

❌ **Wrong:** `code/Dockerfile`
✅ **Correct:** `Dockerfile`

❌ **Wrong:** Build context = `/code`
✅ **Correct:** Build context = `.`

❌ **Wrong:** Port = `code` or `/code`
✅ **Correct:** Port = `3002`

## Quick Retry Steps

1. **Delete** the application in Dokploy
2. **Re-add** the GitHub repository
3. **Carefully set** the Dockerfile path to exactly: `Dockerfile`
4. **Verify** all environment variables
5. **Deploy** and watch logs

## Support

If error persists:
1. Check Dokploy logs: `docker logs <dokploy-container>`
2. Verify Docker is running: `docker ps`
3. Test build locally first (see Option B above)
4. Review Dokploy documentation for your version

---

**Note:** The most common cause is Dokploy's UI setting the build file to `code` instead of `Dockerfile`. Double-check this in your Dokploy dashboard settings!
