// Asset manifest for the /brendon rebuild — pulled from the "BRENDON PROTFOLIO"
// folder in Cloudinary (cloud: du5nhfcgd) via the Admin API, so these are the user's
// real uploaded assets, not placeholders.

const CLOUD = "du5nhfcgd"

/** Cloudinary delivery URL. `f_auto,q_auto` transcodes HEIC photos to a browser-safe format. */
function cld(publicId: string, transform = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transform}/${publicId}`
}

export const heroAssets = {
  sky: cld("Sunny_Rolling_Green_Hills_Under_Blue_Skies_iaxstc"),
  avatarLeft: cld("IMG_6943_amf7vw", "f_auto,q_auto,w_200,h_200,c_fill,g_face"),
  avatarRight: cld("IMG_6944_ulvjuh", "f_auto,q_auto,w_200,h_200,c_fill,g_face"),
  // Flag-style tags (kept from the original upload — only repositioned)
  tagArtDirection: cld("Art_Direction_h2objt"),
  tagRemote: cld("Remote_button_j9zcaf"),
  // Clip-pill tags — real SVGs (the earlier PNG renders were rasterized wrong)
  tagBranding: cld("chip-2_Pink_eey3gd"),
  tagMotion: cld("chip-3_Purple_e3kifg"),
  tagWebDesign: cld("chip-1_Green_zeuptf"),
  // Wordmark selection-frame border, used as-is instead of hand-rolled CSS corners
  wordmarkBorder: cld("Border_name_sc0oc5"),
  iconSpiralDart: cld("circle_spiral_dart_icon_wfdjfj"),
  iconFlower: cld("flower_text_icon_hckys8"),
}

export const aboutAssets = {
  workspacePhoto: cld("IMG_6930_lobccg", "f_auto,q_auto,w_600"),
  yellowInBetween: cld("YELLOW_INBETWEEN_nxezvd"),
  lastIcon: cld("last_icon_ycumch"),
  artDirectionIconSvg: cld("art_directionIcon_cgwiyu"),
  brandIdentityPng: cld("Brand_identity_b8fwpa"),
  artDirectionIconPng: cld("art_direction_icon_gty9bm"),
  motionDesignIconSvg: cld("motion_design_icon_ntmwnd"),
  designSystemPng: cld("design_system_ay7ybl"),
  designSystemIconSvg: cld("design_system_Icon_fxpvz3"),
  brandIdentityIconSvg: cld("brand_identity_Icon_l5zhm5"),
  startProjectButton: cld("Button-Stack_start_a_project_tj6hft"),
  aboutMeTag: cld("Blue_About_me_krwcrd"),
}

// Reuses the same real photo already shown in the About section (IMG_6930),
// just at sizes suited for schema.org/OpenGraph rather than the polaroid UI —
// avoids inventing a placeholder headshot URL that doesn't actually exist yet.
export const seoAssets = {
  headshot: cld("IMG_6930_lobccg", "f_auto,q_auto,w_1200"),
  ogImage: cld("IMG_6930_lobccg", "f_auto,q_auto,w_1200,h_630,c_fill,g_face"),
}

export const featuredWorkAssets = {
  projectFrameIcon: cld("Frame_project_text_icon_aaklrj"),
  projectsTag: cld("Blue_PROJECTS_cxp8vk"),
  folderIcon: cld("Link_folder_work_f04ez4"),
}

export const projectCovers = {
  vaultra: cld("1_gdy8an", "f_auto,q_auto,w_1600"),
  giftlyft: cld("25_stljpn", "f_auto,q_auto,w_1600"),
}

export const perspectiveAssets = {
  // Face-aware crop so Brendon stays centered in frame regardless of viewport
  // aspect ratio — the raw photo is a tall portrait shot mostly of backdrop,
  // and CSS object-position alone couldn't keep him in frame at every width.
  workingPhoto: cld("IMG_7035_z00m4t", "c_fill,g_face,ar_16:9,w_1920,q_auto,f_auto"),
}

// Whimsical closer for the footer — a single stool on a grassy hill, echoing
// the hero's own grass/moss scene as a quiet bookend to the page. Hosted on
// a different Cloudinary account (dusynu0kv) than the rest of this file's
// assets, so it bypasses the du5nhfcgd-scoped cld() helper above.
export const footerAssets = {
  hillStool: "https://res.cloudinary.com/dusynu0kv/image/upload/f_auto,q_auto,w_1600/v1789893574/mbwvwodbnicn1jkmr7jq.png",
}
