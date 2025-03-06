import React, { useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJSON as LeafletGeoJSON, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import denmarkGeoJSON from "../data/denmark-districts.json";
import {
  Feature,
  Geometry,
  GeoJsonProperties,
  FeatureCollection,
} from "geojson";

type MapComponentProps = {
  hoveredColumn: number | null; // a number that maps to regions
};

const MapComponent: React.FC<MapComponentProps> = ({ hoveredColumn }) => {
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);

  // Map columns to region names
  const columnToRegionsMap: { [key: number]: string[] } = {
    0: ["Syddanmark"],
    1: ["Sjælland"],
    2: ["Hovedstaden"], // Column 5 behaves the same as column 1
    3: ["Nordjylland", "Midtjylland"],
    4: ["Syddanmark"],
    5: ["Hovedstaden"],
  };

  // Get the list of regions to highlight based on the hovered column
  const highlightedRegions =
    hoveredColumn !== null ? columnToRegionsMap[hoveredColumn] || [] : [];

  // Base style for all GeoJSON features
  const baseStyle: PathOptions = {
    color: "transparent",
    weight: 0,
    opacity: 0,
  };

  // Highlight style for selected regions
  const highlightStyle: PathOptions = {
    color: "#00847c",
    weight: 0.5,
    opacity: 1,
  };

  // The style function determines the style for each feature
  const style = (
    feature?: Feature<Geometry, GeoJsonProperties>,
  ): PathOptions => {
    const shapeName = feature?.properties?.shapeName;
    if (shapeName && highlightedRegions.includes(shapeName)) {
      return highlightStyle;
    }
    return baseStyle;
  };

  return (
    <div className="h-full w-full" style={{ position: "relative" }}>
      <MapContainer
        className="h-full w-full"
        center={[56.2639, 9.5018]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={hoveredColumn}
          ref={geoJsonRef}
          data={denmarkGeoJSON as FeatureCollection}
          style={style}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
