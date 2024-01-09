import { Card, CardMedia } from "@mui/material";
import TablaFixture from "../components/tabla-fixture";

export default function Home() {
  const cardStyle = {
    maxWidth: 400,
    margin: "auto",
    marginTop: 50,
  };

  const mediaStyle = {
    height: 0,
    paddingTop: "56.25%", // 16:9
  };
  return (
    <div>
      <Card style={cardStyle}>
        <CardMedia
          style={mediaStyle}
          image="../assets/9lq03d-LogoMakr.png"
          title="Descripción de la imagen"
        />
      </Card>
      <TablaFixture />
    </div>
  );
}
