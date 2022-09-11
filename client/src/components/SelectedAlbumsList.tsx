import { useCallback, useEffect, useState } from "react";
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography, } from "@mui/material";
import { getSavedAlbums } from "../api-services";
import { useStore, useHydration } from "../store";
import { useInfiniteQuery } from "react-query";
import { AlbumCard } from "./AlbumCard";
import { response } from "express";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

interface Props {
    currentAlbums: SpotifyApi.SavedAlbumObject[]
}

export const SelectedAlbumsList = () => {
    const isHydrated = useHydration();
    const selectedAlbums = useStore((store) => store.selectedAlbums)
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const handleOpen = (id: string) => () => setOpenItems((items) => ({...items, [id]: !items[id]}))

return isHydrated ? (<List
        sx={{ width: '100%', maxWidth: 600, height: 300, overflow: 'scroll', border: '3px solid black', bgcolor: 'background.paper'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        
        subheader={
        <ListSubheader sx={{padding: '1rem'}} component="div" id="nested-list-subheader">
            <Typography variant="h3">
                Selected Albums
            </Typography>
        </ListSubheader>
        }
        >
    {Array.from(selectedAlbums.values()).map((album) => 
    <div  key={album.id}>
    <ListItemButton sx={{fontSize: '1rem'}} onClick={handleOpen(album.id)} >
        <ListItemText primary={`${album.name} - ${album.artists.map(artist => artist.name).join(', ')}`} />
    {   openItems[album.id] ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openItems[album.id]} timeout="auto" unmountOnExit>
        <List sx={{ backgroundColor: '#acacacece'}} component="div" disablePadding>
            {album.tracks.items.map((track) => 
                <ListItemText sx={{marginLeft: '40px', fontSize: '0.875rem'}} key={track.id}  primary={track.name}  primaryTypographyProps={{variant: 'body2'}}/>
            )}
        </List>
    </Collapse>
</div>)}

</List>) : null
}

