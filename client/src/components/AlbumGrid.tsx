import { Grid } from "@mui/material";
import { AlbumCard } from "src/components/AlbumCard";

interface Props {
  currentAlbums: SpotifyApi.SavedAlbumObject[];
}

export const AlbumGrid = ({ currentAlbums }: Props) => (
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {currentAlbums.map(({ album }) => (
      <Grid item xs={2} sm={4} md={4} key={album.id}>
        <AlbumCard album={album} />
      </Grid>
    ))}
  </Grid>
);
