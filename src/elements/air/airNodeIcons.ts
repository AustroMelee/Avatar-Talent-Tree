/**
 * Individually chosen emoji assignments for Air nodes, based on their name and theme
 * Each emoji is unique and thematically appropriate to reduce repetition
 */
export const AIR_NODE_ICONS: Record<string, string> = {
  // --- Dancing Wind Path ---
  'genesis': '🦋', // The Dancing Wind Path (freedom, movement)
  'minor_genesis_1': '🪁', // Uplifting Spirit
  'minor_genesis_2': '🪂', // Graceful Descent
  'A1': '⛵', // Sky Sailing
  'minor_a1_1': '💨', // Swift Sailing
  'minor_a1_2': '🔄', // Agile Turns
  'minor_a1_3': '🪁', // Longer Glide
  'A2': '🌀', // Air Scooter
  'minor_a2_1': '⏳', // Enduring Ride
  'minor_a2_2': '🌊', // All-Terrain Ball
  'minor_a2_3': '⚡', // Faster Scooter
  'A3': '💃', // Sky Dancing
  'minor_a3_1': '✨', // Perfect Form
  'minor_a3_2': '🔗', // Extended Dance
  'minor_a3_3': '🎶', // Graceful Dance
  'APEX_A': '🦅', // Sky Sovereign
  'minor_apex_a_1': '💪', // Stronger Winds
  'minor_apex_a_2': '🌪️', // Wider Winds
  'minor_apex_a_3': '⏳', // Longer Winds
  'B1': '🌪️', // Spiraling Spout
  'minor_b1_1': '⬆️', // Higher Spout
  'minor_b1_2': '🧍', // Stable Column
  'minor_b1_3': '⚡', // Faster Spout
  'B2': '💨', // Wind Sprint
  'minor_b2_1': '⏳', // Sustained Wind
  'minor_b2_2': '🌬️', // Trailing Breeze
  'minor_b2_3': '⚡', // Stronger Sprint
  'B3': '🪂', // Aerial Mastery
  'minor_b3_1': '🧘', // Perfect Hover
  'minor_b3_2': '🧗', // Vertical Rider
  'minor_b3_3': '⏳', // Longer Hover
  'APEX_B': '🦅', // Wind Walker
  'minor_apex_b_1': '👁️', // Clearer Paths
  'minor_apex_b_2': '⚡', // Faster Riding
  'minor_apex_b_3': '🔀', // Multiple Currents
  'C1': '☀️', // Reckless Joy
  'minor_c1_1': '🏋️', // High Altitude Training
  'minor_c1_2': '💪', // Soaring Vigor
  'minor_c1_3': '⬆️', // Higher Heights
  'C2': '🚀', // Swift Takeoff
  'minor_c2_1': '💥', // Explosive Start
  'minor_c2_2': '🌀', // Evasive Launch
  'minor_c2_3': '⏩', // Faster Recovery
  'C3': '🦋', // Freedom's Flight
  'minor_c3_1': '⏳', // Extended Freedom
  'minor_c3_2': '🎯', // Perfect Control
  'minor_c3_3': '💪', // Greater Freedom
  'APEX_C': '🌌', // Boundless Sky
  'minor_apex_c_1': '⚡', // Faster Movement
  'minor_apex_c_2': '🎯', // Perfect Control
  'minor_apex_c_3': '🌌', // Boundless Range
  'SYNTHESIS_A_B': '⚛️', // Freedom Mastery
  'BRIDGE_B': '🌉', // Cross-Path Bridge
  'rite_wind': '🌬️', // Trial of the Wind
  'rite_freedom': '🦋', // Trial of Freedom
  'rite_sky': '☁️', // Trial of the Sky
  'cap_flight': '🦅', // True Flight
  'cap_mastery': '🏆', // Master of Air and Sky
  'cap_freedom': '🦋', // Freedom Incarnate
  'schism_momentum': '⚡', // Momentum's Slave (dangerous speed)
  'schism_bullet': '💀', // Bullet Wind (deadly force)

  // --- Gentle Breeze Path ---
  'gentle_genesis': '🍃', // The Gentle Breeze Path
  'gentle_minor_genesis_1': '🍂', // Leaf on Wind
  'gentle_minor_genesis_2': '🦶', // Weightless Step
  'gentle_A1': '☁️', // Cloud Shield Technique
  'gentle_minor_a1_1': '🌫️', // Persistent Mist
  'gentle_minor_a1_2': '💨', // Repelling Current
  'gentle_minor_a1_3': '🛡️', // Stronger Shield
  'gentle_A2': '💧', // Flowing Redirection
  'gentle_minor_a2_1': '➡️', // Extended Flow
  'gentle_minor_a2_2': '💨', // Swift Current
  'gentle_minor_a2_3': '🩰', // Smoother Flow
  'gentle_A3': '🌀', // Aura of Deflection
  'gentle_minor_a3_1': '⭕', // Widening Gyre
  'gentle_minor_a3_2': '🌬️', // Enduring Breeze
  'gentle_minor_a3_3': '🛡️', // Stronger Aura
  'gentle_APEX_A': '👁️', // Eye of Serenity
  'gentle_minor_apex_a_1': '👀', // Wider Awareness
  'gentle_minor_apex_a_2': '🧘', // Deeper Calm
  'gentle_minor_apex_a_3': '🤝', // Shared Serenity
  'gentle_B1': '🍃', // Catching Breeze
  'gentle_minor_b1_1': '💨', // Swift Return
  'gentle_minor_b1_2': '🎯', // Guided Flight
  'gentle_minor_b1_3': '👐', // Larger Catch
  'gentle_B2': '💨', // Answering Gust
  'gentle_minor_b2_1': '💪', // Stronger Answer
  'gentle_minor_b2_2': '🌬️', // Wider Reach
  'gentle_minor_b2_3': '⚡', // Faster Answer
  'gentle_B3': '🔄', // Perfect Redirection
  'gentle_minor_b3_1': '⏳', // Extended Window
  'gentle_minor_b3_2': '🌀', // Graceful Throw
  'gentle_minor_b3_3': '🔀', // Multiple Throws
  'gentle_APEX_B': '🪞', // Mirror of Force
  'gentle_minor_apex_b_1': '💪', // Stronger Reflection
  'gentle_minor_apex_b_2': '🪞', // Wider Mirror
  'gentle_minor_apex_b_3': '⏳', // Longer Reflection
  'gentle_C1': '🦻', // Whisper of Danger
  'gentle_minor_c1_1': '⏰', // Earlier Warning
  'gentle_minor_c1_2': '🔍', // Clearer Whisper
  'gentle_minor_c1_3': '📡', // Wider Whisper
  'gentle_C2': '🦅', // Frictionless Flow
  'gentle_minor_c2_1': '🧘', // Unshakeable Balance
  'gentle_minor_c2_2': '💤', // Effortless Motion
  'gentle_minor_c2_3': '⚡', // Faster Flow
  'gentle_C3': '🪂', // Wind Walking
  'gentle_minor_c3_1': '⏳', // Extended Glide
  'gentle_minor_c3_2': '🛡️', // Sky's Protection
  'gentle_minor_c3_3': '⬆️', // Higher Flight
  'gentle_APEX_C': '👻', // Incorporeal Step
  'gentle_minor_apex_c_1': '⏳', // Longer Phase
  'gentle_minor_apex_c_2': '⚡', // Faster Phase
  'gentle_minor_apex_c_3': '🔀', // Multiple Phases
  'gentle_SYNTHESIS_A_B': '⚛️', // Graceful Deflection
  'gentle_BRIDGE_B': '🌉', // Cross-Path Bridge
  'gentle_rite_leaf': '🍃', // Trial of the Leaf
  'gentle_rite_redir': '🔄', // Trial of Redirection
  'gentle_rite_empty': '⚫', // Trial of Emptiness
  'gentle_capstone_leaf': '🌪️', // Leaf Dancing in Hurricane
  'gentle_capstone_mountain': '⛰️', // Breath of the Mountain
  'gentle_capstone_void': '🌑', // Void Walker
  'gentle_schism_gambit': '⚠️', // Hurricane's Gambit
  'gentle_schism_chaos': '🧨', // Chaos Incarnate

  // --- Sacred Breath Path ---
  'sacred_genesis': '🕉️', // The Sacred Breath Path
  'sacred_minor_genesis_1': '🧘', // Deeper Calm
  'sacred_minor_genesis_2': '👁️', // Expanded Sight
  'sacred_A1': '🧠', // Clarity Meditation
  'sacred_minor_a1_1': '⚡', // Swift Clarity
  'sacred_minor_a1_2': '👁️', // Lingering Vision
  'sacred_minor_a1_3': '🔍', // Deeper Insight
  'sacred_A2': '🛡️', // Spirit Barrier
  'sacred_minor_a2_1': '💪', // Stronger Barrier
  'sacred_minor_a2_2': '💚', // Swift Recovery
  'sacred_minor_a2_3': '🛡️', // Larger Barrier
  'sacred_A3': '🕯️', // Trance of Renewal
  'sacred_minor_a3_1': '🕯️', // Deeper Trance
  'sacred_minor_a3_2': '🧠', // Protected Mind
  'sacred_minor_a3_3': '⏳', // Longer Trance
  'sacred_APEX_A': '👁️', // Transcendent Sight
  'sacred_minor_apex_a_1': '👀', // Wider Sight
  'sacred_minor_apex_a_2': '🧠', // Deeper Understanding
  'sacred_minor_apex_a_3': '🤝', // Shared Sight
  'sacred_B1': '🕊️', // Peaceful Presence
  'sacred_minor_b1_1': '🌊', // Wider Peace
  'sacred_minor_b1_2': '🔗', // Deeper Connection
  'sacred_minor_b1_3': '⏳', // Longer Calm
  'sacred_B2': '📜', // Memory of Air
  'sacred_minor_b2_1': '🔍', // Clearer Visions
  'sacred_minor_b2_2': '💭', // Emotional Echo
  'sacred_minor_b2_3': '📚', // Deeper Memory
  'sacred_B3': '👻', // Spirit Projection
  'sacred_minor_b3_1': '🌌', // Extended Range
  'sacred_minor_b3_2': '👁️', // Spirit Sight
  'sacred_minor_b3_3': '⏳', // Longer Projection
  'sacred_APEX_B': '👻', // Speaker with Spirits
  'sacred_minor_apex_b_1': '🗣️', // Stronger Communication
  'sacred_minor_apex_b_2': '👥', // More Spirits
  'sacred_minor_apex_b_3': '🤝', // Spirit Aid
  'sacred_C1': '🔗', // Bonds of Breath
  'sacred_minor_c1_1': '💪', // Stronger Bonds
  'sacred_minor_c1_2': '🌐', // Extended Bonds
  'sacred_minor_c1_3': '👥', // More Bonds
  'sacred_C2': '🌌', // Cosmic Awareness
  'sacred_minor_c2_1': '⚡', // Swift Attunement
  'sacred_minor_c2_2': '⚡', // Energy Sight
  'sacred_minor_c2_3': '🌍', // Larger Awareness
  'sacred_C3': '🕊️', // Universal Calm
  'sacred_minor_c3_1': '🌊', // Greater Calm
  'sacred_minor_c3_2': '⏳', // Lasting Serenity
  'sacred_minor_c3_3': '💙', // Deeper Peace
  'sacred_APEX_C': '🌍', // One With All Life
  'sacred_minor_apex_c_1': '🌐', // Wider Empathy
  'sacred_minor_apex_c_2': '🧠', // Deeper Understanding
  'sacred_minor_apex_c_3': '🤝', // Shared Understanding
  'sacred_SYNTHESIS_A_B': '⚛️', // Spiritual Unity
  'sacred_BRIDGE_B': '🌉', // Cross-Path Bridge
  'sacred_rite_peace': '🕉️', // Trial of Inner Peace
  'sacred_rite_commune': '👻', // Trial of Communion
  'sacred_rite_unity': '🤝', // Trial of Unity
  'sacred_cap_heart': '💚', // Heart of the World
  'sacred_cap_worlds': '🌍', // Master of Both Worlds
  'sacred_cap_unity': '⚛️', // Unity Incarnate
  'sacred_schism_rend': '💔', // Spirit Rending
  'sacred_schism_shatter': '💀', // Soul Shatter

  // --- Wild Gale Path ---
  'wild_genesis': '🐲', // The Wild Gale Path
  'wild_minor_genesis_1': '💨', // Stronger Gale
  'wild_minor_genesis_2': '🌪️', // Wider Storm
  'wild_A1': '💥', // Focused Gale
  'wild_minor_a1_1': '🌌', // Extended Reach
  'wild_minor_a1_2': '💫', // Stunning Impact
  'wild_minor_a1_3': '💥', // Stronger Blast
  'wild_A2': '💥', // Explosive Burst
  'wild_minor_a2_1': '🌊', // Greater Blast
  'wild_minor_a2_2': '🌊', // Echo Blast
  'wild_minor_a2_3': '⚡', // Faster Burst
  'wild_A3': '⚡', // Thunder Clap
  'wild_minor_a3_1': '🔊', // Deafening Roar
  'wild_minor_a3_2': '🌊', // Reverberating Thunder
  'wild_minor_a3_3': '⏳', // Longer Disorientation
  'wild_APEX_A': '⚡', // Lightning Lord
  'wild_minor_apex_a_1': '💥', // Stronger Lightning
  'wild_minor_apex_a_2': '⚡', // Chain Lightning
  'wild_minor_apex_a_3': '⚡', // Faster Strikes
  'wild_B1': '🌪️', // Spinning Vortex
  'wild_minor_b1_1': '💪', // Stronger Pull
  'wild_minor_b1_2': '⏳', // Lasting Funnel
  'wild_minor_b1_3': '🌊', // Larger Vortex
  'wild_B2': '🌍', // Earth Shaker
  'wild_minor_b2_1': '🌊', // Wider Shockwave
  'wild_minor_b2_2': '⏳', // Longer Stun
  'wild_minor_b2_3': '💥', // Stronger Tremor
  'wild_B3': '🌪️', // Hurricane Force
  'wild_minor_b3_1': '💪', // Mightier Storm
  'wild_minor_b3_2': '💨', // Raging Winds
  'wild_minor_b3_3': '🌊', // Larger Hurricane
  'wild_APEX_B': '🌪️', // Storm Sovereign
  'wild_minor_apex_b_1': '👥', // More Tornadoes
  'wild_minor_apex_b_2': '🧠', // Smarter Seeking
  'wild_minor_apex_b_3': '⏳', // Longer Control
  'wild_C1': '💥', // Overcharged Power
  'wild_minor_c1_1': '⚡', // Efficient Channeling
  'wild_minor_c1_2': '💥', // Amplified Power
  'wild_minor_c1_3': '⏳', // Longer Overcharge
  'wild_C2': '🗡️', // Cutting Gale
  'wild_minor_c2_1': '🗡️', // Sharper Edge
  'wild_minor_c2_2': '🌌', // Extended Blades
  'wild_minor_c2_3': '🗡️', // Multiple Cuts
  'wild_C3': '👁️', // Perfect Storm
  'wild_minor_c3_1': '⏳', // Extended Storm
  'wild_minor_c3_2': '💥', // Greater Power
  'wild_minor_c3_3': '⚡', // Faster Activation
  'wild_APEX_C': '🌤️', // Weather Master
  'wild_minor_apex_c_1': '🌍', // Larger Control
  'wild_minor_apex_c_2': '⚡', // Faster Changes
  'wild_minor_apex_c_3': '🌦️', // Complex Weather
  'wild_SYNTHESIS_A_B': '🌪️', // Storm Mastery
  'wild_BRIDGE_B': '🌉', // Cross-Path Bridge
  'wild_rite_storm': '🌪️', // Trial of the Storm
  'wild_rite_lightning': '⚡', // Trial of Lightning
  'wild_rite_eye': '👁️', // Trial of the Eye
  'wild_cap_fury': '💥', // Controlled Fury
  'wild_cap_avatar': '⚡', // Lightning Avatar
  'wild_cap_eye': '👁️', // Eye of All Storms
  'wild_schism_hurricane': '🌪️', // Living Hurricane
  'wild_schism_destruction': '💀', // Avatar of Destruction
};

/**
 * Get emoji icon for a specific Air node
 */
export function getAirNodeIcon(nodeId: string): string {
  return AIR_NODE_ICONS[nodeId] || '🌬️';
}
