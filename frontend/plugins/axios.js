export default function({ app: { $axios }, store }) {
  $axios.setHeader("access-token", store.state.access_token);
  $axios.setHeader("uid", store.state.uid);
  $axios.setHeader("client", store.state.client);
}
