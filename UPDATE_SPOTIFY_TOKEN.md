# How to Fix Spotify Preview URLs

## The Problem
Your debugging shows that the API is working, but `preview_url` is `null` for all tracks. This happens because:
1. **Token permissions** - The token needs the right scopes
2. **Track availability** - Some tracks don't have previews due to licensing
3. **Market restrictions** - Preview availability varies by country

## Solution: Get a New Token with Correct Permissions

1. **Go to Spotify Web API Console**: 
   Visit: https://developer.spotify.com/web-api/console/get-search-item/

2. **Important - Check Required Scopes**:
   - Make sure NO additional scopes are selected (search doesn't require any)
   - The default public access should be sufficient for track previews

3. **Click "Get Token"**:
   - Click the "Get Token" button
   - You might need to log in to your Spotify account
   - Authorize the application

4. **Copy the New Token**:
   - Copy the new access token (starts with "BQA...")

5. **Update Your Application**:
   - Open: `spotify-api-server/src/main/resources/application.yml`
   - Replace the current token value with your new token

6. **Restart Your Spring Boot Server**:
   - Stop the server if it's running
   - Start it again to load the new token

## Test with Better Search Terms

After updating the token, try searching for these terms that are more likely to have previews:
- "Blinding Lights" (The Weeknd)
- "Shape of You" (Ed Sheeran)
- "Despacito" (Luis Fonsi)
- "Bad Guy" (Billie Eilish)
- Popular recent hits

## Alternative: Direct Spotify Preview Test

You can also test if previews are available by directly accessing the Spotify Web API:
1. Open your browser console
2. Try this URL with your token:
   ```
   https://api.spotify.com/v1/search?q=blinding%20lights&type=track&limit=10
   ```

## Example application.yml after update:
```yaml
server:
  servlet-path: /rest/
  port: 8081

# Get a new token from: https://developer.spotify.com/web-api/console/get-search-item/
# Replace the token below with your new token
token: "BQC4YP7XSWucaqWPedYMI48tg9xTqyFPS3hFkp0765wKR4O2_sTg6Uv9A5Of_L4yPxJYGNkxnUg-9fp3aMsrhgxEYU2sQynvpntaMujnBRGJPKPdyLqn0IdC-ITkSq7DmO0uubak"
```

## Test the Fix:
After updating the token and restarting the server, refresh your web app and try searching again. You should now see play buttons instead of "No preview" messages.

## Note:
Spotify tokens expire regularly (usually after 1 hour), so you may need to repeat this process if you use the app frequently.