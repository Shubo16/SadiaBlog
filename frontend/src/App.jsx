import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import AnimationScroll from "./components/extras/animationScroll";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AnimatePresence, motion } from "framer-motion";
import BlogContentsPage from "./components/blogs/blogPage/BlogContentsPage";
import MyAccount from "./pages/MyAccount";
import { Slide, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/extras/Footer";

function AnimatedRoutes() {
  const location = useLocation();
  console.log(`User is now on the ${location.pathname} page`);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />

        <Route
          path="/blogs"
          element={
            <PageWrapper>
              <Blogs />
            </PageWrapper>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <PageWrapper>
              <BlogContentsPage />
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/myAccountPage"
          element={
            <PageWrapper>
              <MyAccount />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <SignUp />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      className="flex flex-col min-h-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <AnimationScroll />
        <Navbar />

        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={5}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Zoom}
        />
      </div>
    </BrowserRouter>
  );
}
