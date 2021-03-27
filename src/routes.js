import RequireAuth from "./hoc/require_auth"
import DefaultLayout from './layouts/DefaultLayout';
import LoginLayout from './layouts/LoginLayout';
import HomeView from './views/home'
import LoginView from './views/login'
import RegisterView from './views/register'
import CategoryView from './views/category'
import CreateView from './views/createweb'
import EditwebView from './views/editweb'
import Webpage from './views/webpage'
import ProfileView from './views/profile'
import ChangePasswordView from './views/changepassword'

//route configurations
const routes = [
    {
        path: `${process.env.PUBLIC_URL}/`,
        exact: true,
        layout: DefaultLayout,
        component: HomeView,
    },
    {
        path: `${process.env.PUBLIC_URL}/login`,
        exact: true,
        layout: LoginLayout,
        component: LoginView,
    },
    {
        path: `${process.env.PUBLIC_URL}/register`,
        exact: true,
        layout: LoginLayout,
        component: RegisterView,
    },
    {
        path: `${process.env.PUBLIC_URL}/category`,
        exact: true,
        layout: LoginLayout,
        component: CategoryView,
    },
    {
        path: `${process.env.PUBLIC_URL}/create`,
        exact: true,
        layout: LoginLayout,
        component: CreateView,
    },
    {
        path: `${process.env.PUBLIC_URL}/edit`,
        exact: true,
        layout: LoginLayout,
        component: RequireAuth(EditwebView),
    },
    {
        path: `${process.env.PUBLIC_URL}/webpage`,
        exact: true,
        layout: LoginLayout,
        component: Webpage,
    },
    {
        path: `${process.env.PUBLIC_URL}/profile`,
        exact: true,
        layout: LoginLayout,
        component: RequireAuth(ProfileView),
    },
    {
        path: `${process.env.PUBLIC_URL}/changepassword`,
        exact: true,
        layout: LoginLayout,
        component: RequireAuth(ChangePasswordView),
    }
]

export default routes;