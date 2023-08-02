import { Grid } from "@mui/material";
import { AlbumCard } from "src/components/AlbumCard";

interface Props {
  currentAlbums: SpotifyApi.SavedAlbumObject[];
}

/**
 * A grid of album cards.
 * @prop currentAlbums - The albums selected.
 */
export const AlbumGrid = ({ currentAlbums }: Props) => (
  <Grid
    container
    spacing={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
    columns={{ xs: 1, sm: 8, md: 12, lg: 12, xl: 12 }}
  >
    {currentAlbums.map(({ album }, index) => (
      <Grid
        item
        xs={2}
        sm={4}
        md={4}
        lg={4}
        xl={4}
        key={`${album.id}-${index}`}
      >
        <AlbumCard album={album} />
      </Grid>
    ))}
  </Grid>
);
