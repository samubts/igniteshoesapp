import { OneSignal } from "react-native-onesignal"

export function tagUserInfoCreat() {
 OneSignal.User.addTags({
    user_name: "Samuel",
    user_email: "samuelbts1993@gmail.com"
 })
}