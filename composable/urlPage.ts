export const urlPage = async () => {
  const route = useRoute();
  const routePath = route.fullPath;
  const host = useRequestURL().host;
  const https = host !== "localhost:3000" ? "https://" : "";
  return https + host + routePath;
};
