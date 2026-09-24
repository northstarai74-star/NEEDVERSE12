-- NeedVerse demo catalog data.
-- Run after schema.sql. Mirrors lib/data/seed-data.ts exactly — if you add a
-- product/vehicle there, add the matching row here so local fallback data and
-- the live database show the same catalog.

insert into vehicle_makes (id, name) values
  ('maruti-suzuki', 'Maruti Suzuki'),
  ('tata', 'Tata'),
  ('hyundai', 'Hyundai'),
  ('mahindra', 'Mahindra')
on conflict (id) do nothing;

insert into vehicle_models (id, make_id, name, generation, year_start, year_end, fuel_types) values
  ('maruti-suzuki-swift', 'maruti-suzuki', 'Swift', 'Gen 3', 2018, null, ARRAY['Petrol', 'CNG']),
  ('maruti-suzuki-baleno', 'maruti-suzuki', 'Baleno', 'Gen 2', 2022, null, ARRAY['Petrol']),
  ('tata-nexon', 'tata', 'Nexon', 'Facelift', 2023, null, ARRAY['Petrol', 'Diesel', 'Electric']),
  ('tata-punch', 'tata', 'Punch', null, 2021, null, ARRAY['Petrol', 'CNG']),
  ('hyundai-creta', 'hyundai', 'Creta', 'Gen 3', 2024, null, ARRAY['Petrol', 'Diesel']),
  ('hyundai-i20', 'hyundai', 'i20', 'Gen 3', 2020, null, ARRAY['Petrol']),
  ('mahindra-xuv700', 'mahindra', 'XUV700', null, 2021, null, ARRAY['Petrol', 'Diesel'])
on conflict (id) do nothing;

insert into categories (id, name, description, sort_order) values
  ('interior', 'Interior', 'Mats, organizers and cabin upgrades', 1),
  ('exterior', 'Exterior', 'Body covers, visors and styling', 2),
  ('electronics', 'Electronics', 'Dash cams, chargers and sensors', 3),
  ('comfort', 'Comfort', 'Cushions, pillows and ambience', 4),
  ('care', 'Car Care', 'Cleaning and detailing kits', 5)
on conflict (id) do nothing;

insert into products (
  id, name, category_id, brand, sku, description, whats_included,
  price_inr, compare_at_price_inr, fit_type, specs, rating, review_count, stock, is_featured
) values
  ('premium-5d-floor-mats', 'Premium 5D Floor Mats', 'interior', 'NeedVerse Essentials', 'NV-INT-001',
   'Custom-molded 5D floor mats that wrap up the door sills for full coverage. Leatherette finish, anti-skid backing, and a raised edge to trap water, mud and dust.',
   ARRAY['1x driver mat', '1x passenger mat', '2x rear mats', '1x boot mat'],
   2499, 3499, 'vehicle_specific',
   '{"Material":"Leatherette + rubber base","Warranty":"12 months","Installation":"Direct fit, no cutting"}'::jsonb,
   4.6, 214, 42, true),

  ('seat-gap-organizer', 'Seat Gap Organizer (Pair)', 'interior', 'NeedVerse Essentials', 'NV-INT-002',
   'Closes the gap between seat and console so coins, phones and keys stop falling through.',
   ARRAY['2x organizer pockets', 'Mounting clips'],
   599, null, 'universal',
   '{"Material":"PU leather","Fit":"Universal — most sedans & SUVs"}'::jsonb,
   4.3, 88, 120, false),

  ('car-door-sill-guards', 'Stainless Steel Door Sill Guards', 'interior', 'AutoForm', 'NV-INT-003',
   'Scratch-resistant sill guards that protect the door entry area from shoe scuffs.',
   ARRAY['4x sill guards', '3M adhesive tape'],
   899, null, 'vehicle_specific',
   '{"Material":"304 stainless steel","Installation":"Peel and stick"}'::jsonb,
   4.4, 63, 30, false),

  ('dashboard-camera-mount', 'Dashboard Phone & Camera Mount', 'interior', 'NeedVerse Essentials', 'NV-INT-004',
   'Adhesive dashboard mount with a 360° ball joint for phones or action cameras.',
   ARRAY['1x mount base', '1x phone clamp'],
   349, null, 'universal',
   '{"Max phone width":"9.5cm","Mount":"Adhesive dashboard pad"}'::jsonb,
   4.1, 41, 75, false),

  ('rear-seat-organizer', 'Backseat Storage Organizer', 'interior', 'TravelKit', 'NV-INT-005',
   'Hangs on the front seat back with multiple pockets, a tablet holder and insulated cup sleeves.',
   ARRAY['1x organizer', '2x adjustable straps'],
   799, 999, 'universal',
   '{"Material":"600D oxford fabric","Pockets":"9"}'::jsonb,
   4.5, 156, 60, false),

  ('steering-wheel-cover', 'Perforated Leather Steering Cover', 'interior', 'AutoForm', 'NV-INT-006',
   'Hand-stitched steering wheel cover sized to the exact steering diameter of your model.',
   ARRAY['1x steering cover', 'Needle & thread kit'],
   649, null, 'vehicle_specific',
   '{"Material":"Perforated PU leather","Sizing":"Model-specific diameter"}'::jsonb,
   4.2, 34, 45, false),

  ('custom-fit-car-body-cover', 'Custom-Fit All-Weather Body Cover', 'exterior', 'ShieldPro', 'NV-EXT-001',
   'Triple-layer, water-resistant body cover tailored to your vehicle''s exact silhouette.',
   ARRAY['1x body cover', 'Storage bag', '2x mirror pockets'],
   2199, 2799, 'vehicle_specific',
   '{"Material":"170T triple-layer fabric","UV protection":"Yes"}'::jsonb,
   4.5, 97, 25, false),

  ('mud-flaps-set', 'Splash Guard Mud Flaps (Set of 4)', 'exterior', 'AutoForm', 'NV-EXT-002',
   'Direct-fit mud flaps that reduce underbody splash and paint chipping.',
   ARRAY['4x mud flaps', 'Mounting screws'],
   799, null, 'vehicle_specific',
   '{"Material":"Reinforced PVC","Installation":"Bolt-on, no drilling"}'::jsonb,
   4.3, 52, 38, false),

  ('door-visor-set', 'Chrome-Line Door Visors', 'exterior', 'ShieldPro', 'NV-EXT-003',
   'Keeps windows cracked open in the rain without water entering the cabin.',
   ARRAY['4x window visors', 'Adhesive strips'],
   999, null, 'vehicle_specific',
   '{"Material":"Acrylic with chrome trim"}'::jsonb,
   4.0, 29, 20, false),

  ('led-fog-lamp-kit', 'LED Fog Lamp Upgrade Kit', 'exterior', 'BrightWorks', 'NV-EXT-004',
   'Plug-and-play LED fog lamps with 6000K white output for better visibility in low light.',
   ARRAY['2x LED fog lamps', 'Wiring harness'],
   1599, null, 'universal',
   '{"Color temp":"6000K","Power":"18W per lamp"}'::jsonb,
   4.4, 71, 33, false),

  ('car-window-sunshade-set', 'Magnetic Window Sunshade Set', 'exterior', 'TravelKit', 'NV-EXT-005',
   'Mesh sunshades that snap on magnetically to block glare and heat for rear passengers.',
   ARRAY['4x window shades'],
   549, 799, 'universal',
   '{"Material":"UV-blocking mesh","Fit":"Universal — trim to size"}'::jsonb,
   4.2, 118, 90, false),

  ('dash-camera-1080p', 'Full HD Dash Camera', 'electronics', 'NeedVerse Tech', 'NV-ELE-001',
   '1080p front dash camera with night vision, loop recording and G-sensor crash detection.',
   ARRAY['1x dash camera', 'Suction mount', 'Charging cable'],
   3499, 4499, 'universal',
   '{"Resolution":"1080p @ 30fps","Storage":"Up to 128GB microSD","Night vision":"Yes"}'::jsonb,
   4.6, 203, 40, true),

  ('wireless-car-charger-mount', '15W Wireless Charger Mount', 'electronics', 'NeedVerse Tech', 'NV-ELE-002',
   'Air-vent mount with auto-clamping arms and 15W fast wireless charging.',
   ARRAY['1x charging mount', 'USB-C cable'],
   999, null, 'universal',
   '{"Max output":"15W","Mount":"Air vent clip"}'::jsonb,
   4.5, 167, 55, true),

  ('tyre-digital-inflator', 'Digital Tyre Inflator', 'electronics', 'NeedVerse Tech', 'NV-ELE-003',
   '12V portable inflator with a digital pressure gauge and auto-shutoff.',
   ARRAY['1x inflator', 'Car socket cable', '3x nozzle adapters'],
   2299, null, 'universal',
   '{"Max pressure":"150 PSI","Power":"12V DC"}'::jsonb,
   4.4, 84, 28, false),

  ('bluetooth-fm-transmitter', 'Bluetooth FM Transmitter', 'electronics', 'NeedVerse Tech', 'NV-ELE-004',
   'Hands-free calling and music streaming for cars without built-in Bluetooth.',
   ARRAY['1x transmitter', 'USB car charger (dual port)'],
   799, null, 'universal',
   '{"Bluetooth":"5.0","USB output":"2x, 3.4A total"}'::jsonb,
   4.1, 59, 66, false),

  ('reverse-parking-sensor-kit', 'Reverse Parking Sensor Kit', 'electronics', 'SafeDrive', 'NV-ELE-005',
   '4-sensor rear parking kit with a buzzer alert, colour-matched to your bumper.',
   ARRAY['4x sensors', 'Control unit', 'Buzzer'],
   1899, null, 'vehicle_specific',
   '{"Sensors":"4","Range":"Up to 1.5m"}'::jsonb,
   4.3, 46, 22, false),

  ('memory-foam-seat-cushion', 'Memory Foam Seat Cushion', 'comfort', 'ComfortRide', 'NV-CMF-001',
   'Orthopedic memory foam cushion that eases lower back strain on long drives.',
   ARRAY['1x seat cushion', 'Non-slip base'],
   899, null, 'universal',
   '{"Material":"Memory foam + mesh cover"}'::jsonb,
   4.5, 132, 50, true),

  ('neck-rest-pillow-pair', 'Neck Rest Pillow (Pair)', 'comfort', 'ComfortRide', 'NV-CMF-002',
   'Soft headrest pillows for driver and passenger that reduce neck fatigue.',
   ARRAY['2x neck pillows', 'Adjustable straps'],
   599, null, 'universal',
   '{"Material":"Plush velvet + memory foam"}'::jsonb,
   4.3, 77, 64, false),

  ('car-perfume-diffuser', 'Alloy Vent Perfume Diffuser', 'comfort', 'AromaDrive', 'NV-CMF-003',
   'Clips onto the AC vent and diffuses a long-lasting, subtle fragrance.',
   ARRAY['1x diffuser', '1x fragrance refill'],
   399, null, 'universal',
   '{"Refill":"Lasts ~45 days"}'::jsonb,
   4.0, 95, 100, false),

  ('sunshade-curtain-set', 'Privacy Curtain Sunshade Set', 'comfort', 'TravelKit', 'NV-CMF-004',
   'Retractable side curtains for shade and privacy on the rear windows.',
   ARRAY['2x side curtains', 'Mounting rails'],
   699, null, 'universal',
   '{"Material":"Blackout fabric"}'::jsonb,
   4.1, 38, 47, false),

  ('microfiber-cleaning-kit', 'Microfiber Cleaning Kit', 'care', 'ShineWorks', 'NV-CAR-001',
   'Everything needed for a quick weekly wipe-down — glass, dash and upholstery safe.',
   ARRAY['4x microfiber cloths', 'Interior cleaner spray', 'Detailing brush'],
   799, 999, 'universal',
   '{"Cloth count":"4","Cloth size":"40x40cm"}'::jsonb,
   4.6, 189, 70, true),

  ('interior-detailing-kit', 'Complete Interior Detailing Kit', 'care', 'ShineWorks', 'NV-CAR-002',
   'A full detailing set for dashboards, leather seats, glass and vents.',
   ARRAY['Dashboard polish', 'Leather cleaner', 'Glass cleaner', 'Vent brush'],
   1299, null, 'universal',
   '{"Items":"4-piece kit"}'::jsonb,
   4.4, 61, 35, false),

  ('car-vacuum-cleaner', 'Portable Car Vacuum Cleaner', 'care', 'ShineWorks', 'NV-CAR-003',
   'Corded 12V vacuum with strong suction for quick cleanups between washes.',
   ARRAY['1x vacuum unit', '3x nozzle attachments', '5m power cable'],
   1799, null, 'universal',
   '{"Power":"106W","Suction":"6000Pa"}'::jsonb,
   4.5, 143, 26, true),

  ('ceramic-coating-spray', 'Ceramic Coating Spray', 'care', 'ShineWorks', 'NV-CAR-004',
   'Spray-on ceramic sealant that adds gloss and hydrophobic protection for months.',
   ARRAY['500ml ceramic spray', 'Applicator cloth'],
   1499, null, 'universal',
   '{"Coverage":"1 full-body application","Durability":"Up to 6 months"}'::jsonb,
   4.3, 54, 31, false)
on conflict (id) do nothing;

insert into product_fitments (product_id, vehicle_model_id) values
  ('premium-5d-floor-mats', 'tata-nexon'),
  ('premium-5d-floor-mats', 'tata-punch'),
  ('car-door-sill-guards', 'maruti-suzuki-swift'),
  ('car-door-sill-guards', 'maruti-suzuki-baleno'),
  ('steering-wheel-cover', 'hyundai-creta'),
  ('steering-wheel-cover', 'hyundai-i20'),
  ('custom-fit-car-body-cover', 'mahindra-xuv700'),
  ('mud-flaps-set', 'tata-nexon'),
  ('door-visor-set', 'maruti-suzuki-swift'),
  ('reverse-parking-sensor-kit', 'hyundai-creta'),
  ('reverse-parking-sensor-kit', 'mahindra-xuv700')
on conflict do nothing;
