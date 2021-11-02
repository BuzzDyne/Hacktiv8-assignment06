export function isEmailExistErrorMsg(text: string): boolean {
    let regex = new RegExp("User with the email '[^']*' already exists")
    return regex.test(text)
}