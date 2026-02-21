# Table For — Future Design

Design targets for the TypeScript/Supabase/React Native build. Wireframes exist for some features; others are being refined.

**Last Updated:** 2026-02-21

---

## Table of Contents

- [Social Relationships](#social-relationships)
- [Explore](#explore)
- [PlaceProfile](#placeprofile)
- [Posts & User Photos](#posts--user-photos)

---

## Social Relationships

Table For has three layers of social connection. Each serves a different purpose and unlocks different features.

### Follow (Asymmetric)
- One-directional — you can follow someone without them following you back (LinkedIn-style)
- Following someone surfaces their activity in your Explore sidebar and feed
- No approval required — public action

### Connection / Friend (Mutual)
- Two-directional — requires a request and acceptance (like a friend request)
- Mutual connections unlock deeper features: "Saved by X friends" on places, FRIENDS' PICKS filter
- Either party can remove the connection

### Groups
- Created from mutual connections only — you can only add people you're connected with
- Group members can accept or decline invitations
- **Shared saved places** — group members contribute to a shared collection of restaurants
- **Calendar integration** — members share availability windows
- **Reservation booking** — match availability across group members, book for the group
- Groups are the core "plan a dinner together" feature

### Relationship Summary

| Feature | Follow | Connection | Group |
|---------|--------|------------|-------|
| Requires approval | No | Yes | Yes (invite) |
| Direction | One-way | Mutual | Mutual |
| See activity in feed | Yes | Yes | Yes |
| "Saved by friends" | No | Yes | Yes |
| Shared saved places | No | No | Yes |
| Calendar / reservations | No | No | Yes |

---

## Explore

**Wireframe:** `src/img/explore.png`

### Two Browse Modes

Explore has two ways to find restaurants in a single view. They don't compete — the search bar is a shortcut, the map is for browsing.

**Text Search Mode:**
- Search bar at top with autocomplete (proven in Firebase MVP)
- User types → autocomplete list appears over the map
- Select a result → navigate to PlaceProfile
- Map is unaffected by search — stays showing nearby pins

**Map Browse Mode:**
- User touches/drags the map → search bar collapses (doesn't disappear)
- Nearby Search API populates pins based on visible map area
- Pins update as user pans/zooms
- Tap a pin → preview card appears

### Preview Card (on pin tap)

Appears as an overlay when a pin is tapped on the map.

**Content:** Restaurant name, location, price level, rating

**Actions:**
- **Tap card** → navigate to PlaceProfile
- **Save button** → quick save (addToSavedPlaces, no navigation)
- **Go button** → open directions in Google Maps

### Social Sidebar

A secondary panel on the Explore screen showing recent social activity related to places:
- Which places have recently been saved or posted about by people you follow or are connected with
- Tapping an item navigates to the PlaceProfile
- Provides social discovery — "what are people in my network eating?"

### Map Component

Shared reusable `<Map>` component used by both Explore and PlaceProfile.
- **Explore:** Multiple pins, pan/zoom to browse nearby
- **PlaceProfile:** Single pin, centered on restaurant location
- **Dependency:** React Native maps library (e.g. `react-native-maps` or Expo MapView) — platform choice TBD

### Filter Chips (Ideas)

**TOP RATED** — Client-side sort of nearby results by rating. Trivial to implement.

**FRIENDS' PICKS** — Highlights places saved by your connections on the map. Requires the connection system.

**NEARBY** — Core functionality. Nearby Search API provides pins as user browses the map. Different endpoint from the autocomplete search.

### Dependencies

- Nearby Search API (different endpoint from autocomplete)
- React Native maps library
- Connection system (for FRIENDS' PICKS filter)
- Follow / connection system (for social sidebar)

---

## PlaceProfile

**Wireframe:** `src/img/place-profile-v2.png`

**Status:** Needs detailed discussion before implementation. Wireframe is aspirational — specific sections and data requirements need to be talked through.

### Layout (from wireframe, not yet confirmed)

```
┌─────────────────────────────────────┐
│ Restaurant Header                   │
│   Name                    ★ Rating  │
│   Type | Price                      │
├─────────────────────────────────────┤
│ Hero Photo                          │
│                                     │
├─────────────────────────────────────┤
│ Photo Thumbnails (gallery)          │
│ [1] [2] [3] [4] [5]                │
├─────────────────────────────────────┤
│ SAVED BY X FRIENDS                  │
│ (avatar circles)                    │
├─────────────────────────────────────┤
│ Map Card                            │
│ ┌─────────────────────────────────┐ │
│ │         (interactive map)       │ │
│ │                                 │ │
│ ├─────────────────────────────────┤ │
│ │ Street Address                  │ │
│ │ City, State ZIP                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Details Card                        │
│ ┌─────────────────────────────────┐ │
│ │ HOURS      Tue-Sat 5pm-10pm    │ │
│ │ PHONE      (503) 544-2100      │ │
│ │ WEBSITE    canardpdx.com       │ │
│ │ REVIEWS    847 on Google       │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ WHAT FRIENDS SAY (X)                │
│ ┌─────────────────────────────────┐ │
│ │ (B) Username        2 hours ago│ │
│ │ "Caption text here"            │ │
│ ├─────────────────────────────────┤ │
│ │ (F) Username          1 week ago│ │
│ │ "Caption text here"            │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ - END -                             │
└─────────────────────────────────────┘

ActionBar (fixed bottom-left):
[←] [+] [share] [navigate]
```

**ActionBar Buttons:**
1. **Back** — Navigate back
2. **Save (+)** — Add to wishlist (hidden if already saved)
3. **Share** — Create post about this place (triggers create post flow)
4. **Navigate** — Open directions in Google Maps

**Responsive ActionBar Behavior:**
- **Web (>480px):** All 4 buttons displayed inline horizontally
- **Mobile (≤480px):** Collapsed to single expandable FAB (speed dial pattern)

**New Data Requirements:**
- `location` (lat/lng) — Required for map display and navigate button
- `currentOpeningHours` — For HOURS display
- `primaryType` — For "French, Wine Bar" subtitle

**New Query Required:**
- `subscribeToPostsByPlace(placeId)` — For "What Friends Say" section

---

## Posts & User Photos

Posts are always connected to a place — every post references a restaurant.

### User-Uploaded Photos
- Users can attach their own photos to posts (food photos, restaurant ambiance, etc.)
- When a user photo exists on a post, it takes priority over the Google Places API photo in display
- Google Places photos serve as fallback when no user photo is provided
- Photo storage via Supabase Storage

### Post Display Priority
1. User-uploaded photo (if present)
2. Google Places API photo (fallback)
3. No photo / placeholder
