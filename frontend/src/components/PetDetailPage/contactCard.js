import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useUid } from "../UidContext";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ContactCard({ owner_id }) {
  const { uid } = useUid();
  const loggedIn = uid !== null;
  const [contactInfo, setContactInfo] = React.useState(null);

  React.useEffect(() => {
    if (loggedIn && owner_id) {
      axios
        .get(`http://backend:8000/user/getInformation/?uid=${owner_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setContactInfo(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching contact info:", error);
        });
    }
  }, [loggedIn, owner_id]);

  return (
    <Card>
      <CardContent>
        {loggedIn ? (
          contactInfo ? (
            <>
              <Typography variant="h5" component="div">
                聯絡人: {contactInfo.username}
              </Typography>
              <Typography variant="h5" component="div">
                連絡電話: {contactInfo.phone}
              </Typography>
              <Typography variant="h5" component="div">
                信箱: {contactInfo.email}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" component="div">
              無法獲取聯絡資訊
            </Typography>
          )
        ) : (
          <Typography variant="h6" component="div">
            登入後可查看聯絡資訊
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
