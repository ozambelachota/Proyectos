import { Button } from "@supabase/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientApi } from "../api/client.api";
import { useUserStore } from "../store/login.store";

const LoginWithGoogle = () => {
  const setUser = useUserStore((state) => state.setUserData);
  const navigate = useNavigate();

  const user  = useUserStore((state) => state.username)
  const handleLogin = async () => {
    try {
      const { error } = await clientApi.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/admin",
        },
      });

      if (error) {
        throw new Error("Ocurrió un error durante el inicio de sesión");
      } else {
        console.log("Success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const authListener = clientApi.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);
        if ( session) {
          setUser(
            session.user.user_metadata?.full_name,
            session.user.user_metadata?.picture
          );
          console.log(session)
          navigate("/admin", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }
    );

    // Limpieza de la suscripción al desmontar el componente
    return () => {
      authListener.data?.subscription;
    };
  }, []); // Array de dependencias vacío para que se ejecute solo una vez al montar el componente

  return (
    <>
      <Button
        onClick={handleLogin}
        style={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "14px",
          margin: "5px",
        }}
        icon={
          <img
            src="/google.svg"
            alt="Google"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "8px",
            }}
          />
        }
      >
        Iniciar sesión con Google
      </Button>
    </>
  );
};

export default LoginWithGoogle;
