import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useHydration, useStore } from "src/store";
import shallow from "zustand/shallow";

interface AlbumCardProps {
  album: SpotifyApi.AlbumObjectFull;
}

export const AlbumCard = memo(
  ({ album }: AlbumCardProps) => {
    const image = album.images[0];

    const [isSelected, addAlbum, removeAlbum] = useStore(
      (store) => [
        store.selectedAlbums.get(album.id),
        store.selectAlbums,
        store.removeAlbums,
      ],
      shallow
    );
    const isHydrated = useHydration();
    const handleToggle = () => {
      if (isSelected) {
        removeAlbum(album);
      } else {
        addAlbum(album);
      }
    };

    return (
      <Card
        raised={!isSelected}
        sx={(theme) => ({
          maxWidth: 345,

          height: 372,
          outline: isSelected
            ? `5px solid ${theme.palette.secondary.main}`
            : "none",
          boxShadow: isSelected
            ? "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
            : undefined,
          transition: "outline 0.3s ease, box-shadow 0.3s ease",
          positon: "relative",
        })}
      >
        <CardActionArea
          sx={(theme) => ({
            ["& span.MuiCardActionArea-focusHighlight"]: {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined,
            },
            ["&:hover span.MuiCardActionArea-focusHighlight"]: {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity * 1.5
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined,
            },
            ["&.Mui-focusVisible span.MuiCardActionArea-focusHighlight"]: {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity * 1.5
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined,
            },
            height: 372,
            position: "relative",
          })}
          disabled={!isHydrated}
          onClick={handleToggle}
        >
          {isSelected && (
            <CheckCircleIcon
              sx={(theme) => ({
                position: "absolute",
                width: 120,
                height: 120,
                zIndex: 2,
                color: theme.palette.secondary.main,
                margin: "auto",
                left: 0,
                right: 0,
                bottom: 120,
                top: 0,
              })}
            />
          )}
          <CardMedia
            id="album-image"
            component="img"
            height={240}
            image={image.url}
            alt=""
          />
          <CardContent sx={{ height: "100%" }}>
            <Typography gutterBottom variant="h5" component="div">
              {album.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {album.artists.map((artist) => artist.name).join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  (prevProps, nextProps) => prevProps.album.id === nextProps.album.id
);
