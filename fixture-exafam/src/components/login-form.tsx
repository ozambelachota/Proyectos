import { Button, Container, Link, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { clientApi } from "../api/client.api";
import LoginWithGoogle from "./login-g";

interface LoginFormProps {
  onSignupClick: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: user, error } = await clientApi.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      handleLoginResult(user, error);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleLoginResult = (user: any, error: any) => {
    if (error) {
      console.error("Error during login:", error.message);
    }
    if (user) {
      console.log(user);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "8px",
      }}
    >
      <Typography variant="h5">Iniciar sesión</Typography>
      <form
        style={{ width: "100%", maxWidth: "300px", marginTop: "8px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Correo electrónico"
          {...register("email", { required: "Este campo es requerido" })}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Contraseña"
          type="password"
          {...register("password", { required: "Este campo es requerido" })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Iniciar sesión
        </Button>
        <LoginWithGoogle></LoginWithGoogle>

        <Typography variant="body2" style={{ marginTop: "16px" }}>
          ¿No tienes una cuenta?{" "}
          <Link href="#" onClick={onSignupClick} variant="body2">
            Registrarse
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;
