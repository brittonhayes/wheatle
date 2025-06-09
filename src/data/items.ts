// Item database - random funny household and miscellaneous items
const ITEMS_DATABASE = [
  {
    id: 'marlboro_redbull',
    name: 'Pack of Marlboro Reds + Red Bull',
    emoji: '🚬',
    price: 18.47
  },
  {
    id: 'dennys_coffee',
    name: "Black Coffee at Denny's",
    emoji: '☕',
    price: 2.79
  },
  {
    id: 'bugatti_veyron',
    name: 'Bugatti Veyron',
    emoji: '🏎️',
    price: 1700000.0
  },
  {
    id: 'gas_station_hotdog',
    name: 'Gas Station Hot Dog (questionable age)',
    emoji: '🌭',
    price: 1.99
  },
  {
    id: 'scratch_ticket',
    name: 'Scratch-off Lottery Ticket',
    emoji: '🎫',
    price: 5.0
  },
  {
    id: 'airpods_pro',
    name: "AirPods Pro (you'll lose in 2 weeks)",
    emoji: '🎧',
    price: 249.0
  },
  {
    id: 'yacht_rental',
    name: 'Yacht Rental (1 day)',
    emoji: '🛥️',
    price: 8500.0
  },
  {
    id: 'pack_gum',
    name: 'Pack of Trident Gum',
    emoji: '🫧',
    price: 1.29
  },
  {
    id: 'tesla_model_s',
    name: 'Tesla Model S Plaid',
    emoji: '⚡',
    price: 129990.0
  },
  {
    id: 'monster_energy',
    name: 'Monster Energy (Kyle approved)',
    emoji: '👹',
    price: 3.49
  },
  {
    id: 'toilet_paper_premium',
    name: 'Premium 3-Ply Toilet Paper',
    emoji: '🧻',
    price: 24.99
  },
  {
    id: 'banana_single',
    name: 'Single Banana',
    emoji: '🍌',
    price: 0.68
  },
  {
    id: 'private_jet_hour',
    name: 'Private Jet (1 hour)',
    emoji: '🛩️',
    price: 12000.0
  },
  {
    id: 'ramen_fancy',
    name: 'Shin Ramyun (the good stuff)',
    emoji: '🍜',
    price: 1.89
  },
  {
    id: 'iphone_15_pro',
    name: 'iPhone 15 Pro Max',
    emoji: '📱',
    price: 1199.0
  },
  {
    id: 'uber_surge_pricing',
    name: 'Uber Ride (3x surge pricing)',
    emoji: '🚗',
    price: 47.83
  },
  {
    id: 'diamond_ring',
    name: 'Diamond Engagement Ring',
    emoji: '💍',
    price: 7500.0
  },
  {
    id: 'energy_drink_5hour',
    name: '5-Hour Energy (berry flavor)',
    emoji: '⚡',
    price: 4.99
  },
  {
    id: 'movie_theater_popcorn',
    name: 'Movie Theater Popcorn (large)',
    emoji: '🍿',
    price: 12.5
  },
  {
    id: 'space_tourism',
    name: 'Virgin Galactic Space Flight',
    emoji: '🚀',
    price: 450000.0
  },
  {
    id: 'designer_handbag',
    name: "Designer Handbag (that you'll be afraid to use)",
    emoji: '👜',
    price: 3500.0
  },
  {
    id: 'instant_ramen_bulk',
    name: 'Instant Ramen (30 pack, survival mode)',
    emoji: '🍜',
    price: 15.99
  },
  {
    id: 'artisanal_toast',
    name: 'Artisanal Toast',
    emoji: '🍞',
    price: 12.0
  },
  {
    id: 'gaming_pc_high_end',
    name: 'High-End Gaming PC',
    emoji: '💻',
    price: 4000.0
  },
  {
    id: 'collectible_sneakers',
    name: 'Collectible Sneakers',
    emoji: '👟',
    price: 800.0
  },
  {
    id: 'gourmet_cat_food',
    name: 'Gourmet Cat Food',
    emoji: '🐈',
    price: 3.5
  },
  {
    id: 'electric_scooter',
    name: 'Electric Scooter',
    emoji: '🛴',
    price: 499.0
  },
  {
    id: 'craft_beer_six_pack',
    name: 'Craft Beer Six-Pack',
    emoji: '🍺',
    price: 18.0
  },
  {
    id: 'luxury_watch',
    name: 'Luxury Watch (tells time, expensively)',
    emoji: '⌚',
    price: 15000.0
  },
  {
    id: 'vintage_vinyl_record',
    name: 'Vintage Vinyl Record',
    emoji: '🎵',
    price: 45.0
  },
  {
    id: 'smart_fridge',
    name: "Smart Fridge (tweets when you're out of milk)",
    emoji: '🧊',
    price: 3000.0
  },
  {
    id: 'helicopter_tour',
    name: 'Helicopter Tour of the City',
    emoji: '🚁',
    price: 350.0
  },
  {
    id: 'robot_vacuum',
    name: 'Robot Vacuum',
    emoji: '🤖',
    price: 299.0
  },
  {
    id: 'first_class_flight_international',
    name: 'First Class International Flight',
    emoji: '✈️',
    price: 10000.0
  },
  {
    id: 'antique_sword',
    name: 'Antique Sword (for display and arguments)',
    emoji: '⚔️',
    price: 600.0
  },
  {
    id: 'bidet_attachment',
    name: 'Bidet Attachment (life changing)',
    emoji: '🚽',
    price: 49.99
  },
  {
    id: 'subscription_box_pickles',
    name: 'Monthly Pickle Subscription Box',
    emoji: '🥒',
    price: 29.99
  },
  {
    id: 'pack_of_matches',
    name: 'Pack of Matches (for emergencies or tiny fires)',
    emoji: '🔥',
    price: 0.99
  },
  {
    id: 'single_sock',
    name: 'Single Sock (mystery of the missing pair)',
    emoji: '🧦',
    price: 0.5
  },
  {
    id: 'used_bandaid',
    name: 'Used Bandaid (found on the street)',
    emoji: '🩹',
    price: 0.01
  },
  {
    id: 'moon_rock',
    name: 'A Certified Moon Rock (allegedly)',
    emoji: '🌑',
    price: 2500000.0
  },
  {
    id: 'solid_gold_toilet',
    name: 'Solid Gold Toilet (functional art?)',
    emoji: '🏆',
    price: 5000000.0
  },
  {
    id: 'pet_rock_original',
    name: 'Original Pet Rock (with care manual)',
    emoji: '🪨',
    price: 19.95
  },
  {
    id: 'dennys_grand_slam',
    name: "Denny's Grand Slam Breakfast",
    emoji: '🥞',
    price: 12.99
  },
  {
    id: 'fiverr_portrait_questionable',
    name: 'Custom Digital Portrait (Fiverr gig, questionable quality)',
    emoji: '🎨',
    price: 25.0
  },
  {
    id: 'vape_pen_mystery_flavor',
    name: 'Disposable Vape Pen (mystery gas station flavor)',
    emoji: '💨',
    price: 15.0
  },
  {
    id: 'concert_tickets_bad_band',
    name: 'Concert Tickets (nosebleed section, opening band only)',
    emoji: '🎤',
    price: 35.5
  },
  {
    id: 'payday_loan_regret',
    name: 'Payday Loan (2-week, 400% APR, endless regret)',
    emoji: '💸',
    price: 150.0
  },
  {
    id: 'expired_allergy_pills',
    name: 'Expired Allergy Pills (found in coat pocket)',
    emoji: '💊',
    price: 0.25
  },
  {
    id: 'onlyfans_sub_obscure_cheap',
    name: 'Subscription to an Obscure OnlyFans (3 followers)',
    emoji: '💻',
    price: 4.99
  },
  {
    id: 'pbr_case_lukewarm',
    name: 'Case of Pabst Blue Ribbon (lukewarm)',
    emoji: '🍺',
    price: 18.99
  },
  {
    id: 'basement_tattoo_misspelled',
    name: "Small, Misspelled Tattoo (artist was '''learning''')",
    emoji: '✨',
    price: 40.0
  },
  {
    id: 'bitcoin_bought_at_peak_small_amount',
    name: '0.01 Bitcoin (bought at $69,000 peak, now much less)',
    emoji: '📉',
    price: 690.0
  },
  {
    id: 'starbucks_overly_customized_drink',
    name: 'Starbucks Drink with 7 Customizations',
    emoji: '🥤',
    price: 8.25
  },
  {
    id: 'generic_frozen_burrito_7eleven',
    name: 'Generic Frozen Burrito (7-Eleven, lukewarm center)',
    emoji: '🌯',
    price: 2.49
  },
  {
    id: 'spirit_airlines_nightmare_ticket',
    name: 'Spirit Airlines Ticket (red-eye, 3 layovers, extra fee for air)',
    emoji: '✈️',
    price: 69.0
  },
  {
    id: 'single_bent_loose_cigarette',
    name: 'Single Loose Cigarette (slightly bent)',
    emoji: '🚬',
    price: 1.0
  },
  {
    id: 'worthless_pixelated_monkey_nft',
    name: 'NFT of a Pixelated Monkey (cost $1000, now $0.10)',
    emoji: '🐒',
    price: 1000.0
  },
  {
    id: 'expired_public_transport_pass',
    name: 'Expired Public Transport Pass',
    emoji: '🚌',
    price: 0.05
  },
  {
    id: 'half_eaten_mystery_sandwich',
    name: 'Half-Eaten Sandwich (from office fridge, mystery owner)',
    emoji: '🥪',
    price: 0.75
  },
  {
    id: 'losing_lottery_ticket_almost_won',
    name: 'Losing Lottery Ticket (almost won!)',
    emoji: '🎰',
    price: 2.0
  },
  {
    id: 'slightly_moldy_bread_loaf',
    name: 'Loaf of Bread (slightly moldy)',
    emoji: '🍞',
    price: 1.2
  },
  {
    id: 'can_of_spam_classic',
    name: 'Can of SPAM (classic)',
    emoji: '🥫',
    price: 3.5
  },
  // New items start here
  {
    id: 'gym_membership_unused',
    name: 'Gym Membership (went once in January)',
    emoji: '💪',
    price: 49.99
  },
  {
    id: 'fidget_spinner_2017',
    name: 'Fidget Spinner (peak 2017 nostalgia)',
    emoji: '🌀',
    price: 2.99
  },
  {
    id: 'parking_ticket_unpaid',
    name: 'Unpaid Parking Ticket (accumulating interest)',
    emoji: '🎫',
    price: 75.0
  },
  {
    id: 'doordash_delivery_cold_fries',
    name: 'DoorDash Order (45 min late, cold fries)',
    emoji: '🍟',
    price: 32.67
  },
  {
    id: 'crocs_with_jibbitz',
    name: 'Crocs with 15 Jibbitz (fashion statement)',
    emoji: '🥿',
    price: 89.99
  },
  {
    id: 'essential_oils_mlm',
    name: 'Essential Oils Starter Kit (from that MLM friend)',
    emoji: '💧',
    price: 149.99
  },
  {
    id: 'bathroom_scale_broken',
    name: 'Bathroom Scale (always shows 10 lbs less)',
    emoji: '⚖️',
    price: 19.99
  },
  {
    id: 'expired_condom_wallet',
    name: 'Expired Condom (lived in wallet since 2019)',
    emoji: '🎈',
    price: 0.0
  },
  {
    id: 'tinder_gold_month',
    name: 'Tinder Gold (1 month, 0 matches)',
    emoji: '🔥',
    price: 29.99
  },
  {
    id: 'white_claw_variety_pack',
    name: 'White Claw Variety Pack (no laws)',
    emoji: '🥤',
    price: 15.99
  },
  {
    id: 'amazon_basics_anything',
    name: 'Amazon Basics Version of Something Better',
    emoji: '📦',
    price: 12.99
  },
  {
    id: 'wish_com_airpods',
    name: 'Wish.com "AirPods" (definitely not fake)',
    emoji: '🎧',
    price: 8.99
  },
  {
    id: 'planet_fitness_pizza_day',
    name: 'Planet Fitness Pizza Day Slice',
    emoji: '🍕',
    price: 0.0
  },
  {
    id: 'chipotle_extra_guac',
    name: 'Chipotle Bowl (yes, guac is extra)',
    emoji: '🥑',
    price: 14.85
  },
  {
    id: 'ps5_from_scalper',
    name: 'PS5 from Scalper (2x retail)',
    emoji: '🎮',
    price: 999.99
  },
  {
    id: 'supreme_brick',
    name: 'Supreme Brick (literally just a brick)',
    emoji: '🧱',
    price: 150.0
  },
  {
    id: 'raid_shadow_legends_gems',
    name: 'Raid Shadow Legends Gem Pack',
    emoji: '💎',
    price: 99.99
  },
  {
    id: 'airport_water_bottle',
    name: 'Airport Water Bottle (16oz)',
    emoji: '💧',
    price: 7.99
  },
  {
    id: 'cvs_receipt',
    name: 'CVS Receipt (3 feet long for one item)',
    emoji: '🧾',
    price: 0.0
  },
  {
    id: 'blockbuster_late_fee',
    name: 'Outstanding Blockbuster Late Fee',
    emoji: '📼',
    price: 23.5
  },
  {
    id: 'peloton_clothes_rack',
    name: 'Peloton Bike (expensive clothes rack)',
    emoji: '🚴',
    price: 1895.0
  },
  {
    id: 'juul_pods_mango',
    name: 'Bootleg Mango Juul Pods',
    emoji: '🥭',
    price: 45.0
  },
  {
    id: 'waffle_house_hash_browns',
    name: 'Waffle House Hash Browns (scattered, smothered, covered)',
    emoji: '🥔',
    price: 3.95
  },
  {
    id: 'beanie_baby_worthless',
    name: 'Beanie Baby "Investment" (worth $3)',
    emoji: '🧸',
    price: 3.0
  },
  {
    id: 'limewire_virus',
    name: 'Computer Virus from LimeWire (free with any download)',
    emoji: '🦠',
    price: 0.0
  },
  {
    id: 'college_textbook_unopened',
    name: 'College Textbook (never opened, $300 new)',
    emoji: '📚',
    price: 300.0
  },
  {
    id: 'keurig_environmental_disaster',
    name: 'Keurig Machine + 500 K-Cups',
    emoji: '☕',
    price: 189.99
  },
  {
    id: 'airbnb_cleaning_fee',
    name: 'Airbnb Cleaning Fee (for 1 night stay)',
    emoji: '🧹',
    price: 125.0
  },
  {
    id: 'funko_pop_collection',
    name: 'Funko Pop Collection (40 pieces, still in box)',
    emoji: '🎭',
    price: 600.0
  },
  {
    id: 'expired_groupon',
    name: 'Expired Groupon for Yoga Classes',
    emoji: '🧘',
    price: 39.99
  },
  {
    id: 'reddit_gold_award',
    name: 'Reddit Gold Award (for that one comment)',
    emoji: '🏅',
    price: 5.99
  },
  {
    id: 'disney_plus_nobody_uses',
    name: 'Disney+ Subscription (watched Mandalorian once)',
    emoji: '🏰',
    price: 10.99
  },
  {
    id: 'linkedin_premium_unemployed',
    name: 'LinkedIn Premium (still unemployed)',
    emoji: '💼',
    price: 59.99
  },
  {
    id: 'hello_fresh_forgot_cancel',
    name: 'HelloFresh Box (forgot to skip this week)',
    emoji: '📦',
    price: 89.99
  },
  {
    id: 'mechanical_keyboard_loud',
    name: 'Mechanical Keyboard (roommates hate you)',
    emoji: '⌨️',
    price: 149.99
  },
  {
    id: 'dogecoin_to_moon',
    name: '1000 Dogecoin (to the moon? ...maybe?)',
    emoji: '🐕',
    price: 80.0
  },
  {
    id: 'sketchy_cbd_gummies',
    name: 'CBD Gummies from Gas Station',
    emoji: '🍬',
    price: 19.99
  },
  {
    id: 'instacart_tip_guilt',
    name: 'Instacart Order + Guilt Tip',
    emoji: '🛒',
    price: 127.43
  },
  {
    id: 'youtube_premium_accident',
    name: 'YouTube Premium (clicked wrong button)',
    emoji: '📺',
    price: 13.99
  },
  {
    id: 'baseball_card_worthless',
    name: '1992 Baseball Card (thought it was valuable)',
    emoji: '⚾',
    price: 0.5
  },
  {
    id: 'lime_scooter_drunk_ride',
    name: 'Lime Scooter Ride (2am, 3 miles, surge pricing)',
    emoji: '🛴',
    price: 28.5
  },
  {
    id: 'sourdough_starter_dead',
    name: 'Dead Sourdough Starter (RIP pandemic hobby)',
    emoji: '🍞',
    price: 0.0
  },
  {
    id: 'coursera_course_abandoned',
    name: 'Coursera Course (completed 3%)',
    emoji: '🎓',
    price: 49.0
  },
  {
    id: 'blue_apron_rotting',
    name: 'Blue Apron Ingredients (rotting in fridge)',
    emoji: '🥗',
    price: 69.99
  },
  {
    id: 'pokemon_card_fake',
    name: 'Fake Charizard Pokemon Card',
    emoji: '🔥',
    price: 5.0
  },
  {
    id: 'wine_mom_sign',
    name: 'Live Laugh Love Sign (wine mom starter pack)',
    emoji: '🍷',
    price: 24.99
  },
  {
    id: 'unused_yoga_mat',
    name: 'Yoga Mat (used as rug)',
    emoji: '🧘',
    price: 29.99
  },
  {
    id: 'twitter_blue_checkmark',
    name: 'Twitter Blue Checkmark (monthly)',
    emoji: '✓',
    price: 8.0
  },
  {
    id: 'costco_membership_single',
    name: 'Costco Membership (lives alone)',
    emoji: '🏪',
    price: 60.0
  },
  {
    id: 'air_fryer_trendy',
    name: 'Air Fryer (makes everything taste the same)',
    emoji: '🍳',
    price: 89.99
  },
  {
    id: 'stanley_cup_tumbler',
    name: 'Stanley Tumbler (FOMO purchase)',
    emoji: '🥤',
    price: 45.0
  },
  {
    id: 'ring_doorbell_paranoid',
    name: 'Ring Doorbell (watches delivery drivers)',
    emoji: '🔔',
    price: 199.99
  },
  {
    id: 'celsius_energy_addiction',
    name: 'Case of Celsius (3rd one today)',
    emoji: '⚡',
    price: 28.99
  },
  {
    id: 'draft_kings_deposit',
    name: 'DraftKings Deposit (this is the winning week)',
    emoji: '🎰',
    price: 50.0
  },
  {
    id: 'kombucha_pretentious',
    name: 'Artisanal Kombucha (tastes like vinegar)',
    emoji: '🍶',
    price: 8.99
  },
  {
    id: 'webmd_premium',
    name: 'WebMD Premium (definitely have every disease)',
    emoji: '🏥',
    price: 4.99
  },
  {
    id: 'bath_and_body_works_haul',
    name: 'Bath & Body Works Semi-Annual Sale Haul',
    emoji: '🧴',
    price: 147.5
  },
  {
    id: 'squishmallow_addiction',
    name: 'Giant Squishmallow (27th one)',
    emoji: '🧸',
    price: 39.99
  },
  {
    id: 'shein_haul_regret',
    name: 'SHEIN Haul (nothing fits right)',
    emoji: '👗',
    price: 73.42
  },
  {
    id: 'audible_unused_credits',
    name: 'Audible Subscription (12 unused credits)',
    emoji: '🎧',
    price: 14.95
  }
]

export default ITEMS_DATABASE
