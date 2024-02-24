# Campus Connect

## Intro

For submission for UHI:111012 Mobile Application Development module/

### Installation

Use `npm install` to install dependancies.

_Note_ Instructions assume ionic has been installed globally.

_Note_ To build the APK and deploy using a device, Android Studio is needed.

### Run instructions

#### Using a computer

use `ionic serve` which will launch a browser and havigate to the home screen.

#### Using a device (for testing)

use `ionic capacitor run android -l --external`

This method requires a server to be running on the computer.

#### To deploy to a device

_Note_ only tested using Android!

use: `ionic capacitor run android --prod --external`
Make sure to select device from console (or an emulator will be used)

# To generate asset files

npx capacitor-assets generate
