export const profileUser = () => {
  const profile = []

  if (typeof window != "undefined") {
    profile.push(JSON.parse(window.localStorage.getItem("profile")))
  }

  return profile
}
