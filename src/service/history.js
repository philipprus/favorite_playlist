import { createBrowserHistory } from "history";
const history = createBrowserHistory();
export default history;

export function goTo(route, state) {
    history.push(`/${route}`, state);
}
