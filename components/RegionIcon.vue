<template>
  <img
    v-if="!isCustom"
    :src="iconSource"
    :class="['object-contain flex-shrink-0', sizeClass]"
    :alt="region"
  />
  <span v-else :class="['inline-block flex-shrink-0', sizeClass]"> 📝 </span>
</template>

<script>
import globalIcon from "@/assets/regions/global.webp";
import misthalinIcon from "@/assets/regions/Misthalin_Area_Badge.png";
import karamjaIcon from "@/assets/regions/Karamja_Area_Badge.png";
import asgarniaIcon from "@/assets/regions/Asgarnia_Area_Badge.png";
import desertIcon from "@/assets/regions/Desert_Area_Badge.png";
import fremennikIcon from "@/assets/regions/Fremennik_Area_Badge.png";
import kandarinIcon from "@/assets/regions/Kandarin_Area_Badge.png";
import kourendIcon from "@/assets/regions/Kourend_Area_Badge.png";
import morytaniaIcon from "@/assets/regions/Morytania_Area_Badge.png";
import tirannwnIcon from "@/assets/regions/Tirannwn_Area_Badge.png";
import varlamoreIcon from "@/assets/regions/Varlamore_Area_Badge.png";
import wildernessIcon from "@/assets/regions/Wilderness_Area_Badge.png";

// Region name mappings
const regionAliases = {
  desert: "kharidian",
  zeah: "kourend",
};

const iconMap = {
  global: globalIcon,
  misthalin: misthalinIcon,
  karamja: karamjaIcon,
  asgarnia: asgarniaIcon,
  kharidian: desertIcon,
  fremennik: fremennikIcon,
  kandarin: kandarinIcon,
  kourend: kourendIcon,
  morytania: morytaniaIcon,
  tirannwn: tirannwnIcon,
  varlamore: varlamoreIcon,
  wilderness: wildernessIcon,
};

export default {
  name: "RegionIcon",
  props: {
    region: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "4",
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconSource() {
      const region = this.region.toLowerCase().trim();
      // Check for aliases first, then fall back to direct lookup
      const normalizedRegion = regionAliases[region] || region;
      return iconMap[normalizedRegion] || iconMap.global;
    },
    sizeClass() {
      return `w-${this.size} h-${this.size}`;
    },
  },
};

export { iconMap, regionAliases };
</script>
