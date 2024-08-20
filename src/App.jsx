import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthSlice } from "./store/slices/auth.slice";
import { AppRouter } from "./routes/app.route";
import { ConfigProvider } from "antd";
import "./index.css"; // Hoặc import SCSS

// Định nghĩa theme tùy chỉnh
const customTheme = {
  token: {
    colorPrimary: "#00b96b",
    borderRadius: 12,
    colorBgContainer: "#ffffff20",
    fontFamily: "Nunito",
  },
};

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await dispatch(authActions.initState()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch, authActions]);

  return <ConfigProvider theme={customTheme}>{!loading && <AppRouter />}</ConfigProvider>;
}

export default App;
