import store from './store';
import { userLogout } from './features/Auth/actions';

store.subscribe(() => {
    const state = store.getState();
    const token = state.auth.token;

    // Example: Logout user when token is expired or invalid
    if (!token) {
        store.dispatch(userLogout());
    }
});
