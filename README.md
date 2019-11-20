# NetInfoSSIDDemo

https://github.com/react-native-community/react-native-netinfo/issues/252

I'm seeing the bug on both Android and iOS– but for sake of testing and this demo let's go ahead and figure out what's happening with Android. (iOS might be related to an iOS 13 bug it looks like)

1. Clone this repo, `yarn install`
2. Open the project in Android Studio
3. Plug in a physical Android device, run the app on the device

Once the app is running– you'll notice we do the following:

1. Check location permissions– if we don't have permission but it's requestable– we'll prompt.
2. Click Allow– this will set the permissions as "granted"
3. Once we get "granted" permissions– we'll call `fetch` from @react-native-community/netinfo
4. Notice that the netInfo object that is returned from fetch _does not_ have the SSID.
5. Close the app
6. Re-open the app
7. The app will check location permissions– we already have allowed so it'll set it to "granted" and we won't need to prompt.
8. Since permissions were "gratned"– we'll call `fetch`
9. Notice that the netInfo object this is returned from fetch this time around _does_ have the SSID
