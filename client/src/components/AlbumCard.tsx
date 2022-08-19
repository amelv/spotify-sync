import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Typography } from "@mui/material";
import { getSavedAlbums } from "../api-services";
import { useStore } from "../store";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

interface AlbumCardProps {
    album: SpotifyApi.SavedAlbumObject
}

export const AlbumCard = ({album}: AlbumCardProps) => {
    const image = album.album.images[0];
    
  return (
    <Card>
        
    </Card>
  );
};
