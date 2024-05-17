

import { Routes, Route } from 'react-router-dom';

import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { Create, Experience, Explore, Games, Home, Post, Profile, QA, Saves, Update, Edit, Users } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"



function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />

          </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saves' element={<Saves />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/create' element={<Create />} />
            <Route path='/update_post/:id' element={<Edit />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/profile/:id/*' element={<Profile />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/games' element={<Games />} />
            <Route path='/QA' element={<QA />} />
            <Route path='/Experience' element={<Experience />} />

          </Route>

      </Routes>

      <Toaster />
    </main>
  )
}
 
export default App;
