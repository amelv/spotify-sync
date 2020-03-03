import React from "react"

// Possible contexts are:
// - standalone (default, for appearing in the gallery)
// - entry (for appearing on an entry page)
// - card (for appearing in an entry card)

export const AtlasContext = React.createContext("standalone")