export type CheckoutFieldKey =
  | 'fullName'
  | 'email'
  | 'competitionName'
  | 'song'
  | 'clothing'
  | 'meetDetails'
  | 'attemptWeightPreference'
  | 'phone'
  | 'notes'

export type CheckoutFieldType = 'name' | 'email' | 'text' | 'textarea' | 'select' | 'phone'

export interface CheckoutFieldConfig {
  key: CheckoutFieldKey
  type: CheckoutFieldType
  label: string
  required: boolean
  squarespaceFieldId: string
  placeholder?: string
  description?: string
  options?: string[]
}

const HIGHLIGHT_REEL_FIELDS: CheckoutFieldConfig[] = [
  {
    key: 'fullName',
    type: 'name',
    label: 'Full name',
    required: true,
    squarespaceFieldId: 'name-yui_3_17_2_1_1709169259666_9027',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email for delivery',
    required: true,
    squarespaceFieldId: 'email-yui_3_17_2_1_1709169259666_10472',
    placeholder: 'example@gmail.com',
  },
  {
    key: 'competitionName',
    type: 'text',
    label: 'Name of competition',
    required: true,
    squarespaceFieldId: 'text-0a07c980-c112-4eb3-a681-9a7d0a1dd174',
    placeholder: 'Summer Open 2026',
  },
  {
    key: 'song',
    type: 'text',
    label: 'Song choice',
    required: true,
    squarespaceFieldId: 'text-yui_3_17_2_1_1709169259666_15617',
    placeholder: 'Song link or no preference',
  },
  {
    key: 'clothing',
    type: 'text',
    label: 'Clothing worn',
    required: true,
    squarespaceFieldId: 'text-yui_3_17_2_1_1709169259666_20649',
    placeholder: 'Red SBD singlet + black A7 t-shirt',
  },
  {
    key: 'meetDetails',
    type: 'text',
    label: 'Day, session, flight, weight class + division',
    required: true,
    squarespaceFieldId: 'text-yui_3_17_2_1_1709169259666_26721',
    placeholder: 'March 15, Session 1, Flight A, 93kg Junior',
  },
  {
    key: 'notes',
    type: 'textarea',
    label: 'Additional notes',
    required: false,
    squarespaceFieldId: 'textarea-yui_3_17_2_1_1751924028362_8510',
    placeholder: 'Any specific requests',
  },
]

const CONTACT_INFO_FIELDS: CheckoutFieldConfig[] = [
  {
    key: 'fullName',
    type: 'name',
    label: 'Full name',
    required: true,
    squarespaceFieldId: 'name-yui_3_17_2_1_1706156400389_8725',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email for delivery',
    required: true,
    squarespaceFieldId: 'email-yui_3_17_2_1_1706156400389_10598',
    placeholder: 'example@gmail.com',
  },
  {
    key: 'competitionName',
    type: 'text',
    label: 'Name of competition',
    required: true,
    squarespaceFieldId: 'text-0876517b-4e5b-4331-b99a-bbcb49552940',
    placeholder: 'Summer Open 2026',
  },
  {
    key: 'clothing',
    type: 'text',
    label: 'Clothing worn',
    required: true,
    squarespaceFieldId: 'text-yui_3_17_2_1_1706156400389_15886',
    placeholder: 'Red SBD singlet + black A7 t-shirt',
  },
  {
    key: 'meetDetails',
    type: 'text',
    label: 'Day, session, flight, weight class + division',
    required: true,
    squarespaceFieldId: 'text-yui_3_17_2_1_1706319722739_21525',
    placeholder: 'March 15, Session 1, Flight A, 93kg Junior',
  },
  {
    key: 'attemptWeightPreference',
    type: 'select',
    label: 'Attempt number / weight used',
    required: false,
    squarespaceFieldId: 'select-yui_3_17_2_1_1754990679122_9097',
    description: 'Would you like the attempt number and weight used included in your videos?',
    options: ['YES', 'NO'],
  },
]

const VIDEO_ATTEMPT_FIELDS: CheckoutFieldConfig[] = [
  {
    key: 'fullName',
    type: 'name',
    label: 'Full name',
    required: true,
    squarespaceFieldId: 'name-yui_3_17_2_1_1749457434887_4093',
  },
  {
    key: 'competitionName',
    type: 'text',
    label: 'Name of competition',
    required: true,
    squarespaceFieldId: 'text-f4b32ee0-8e44-4155-9c84-3150259de7b3',
    placeholder: 'Summer Open 2026',
  },
  {
    key: 'meetDetails',
    type: 'textarea',
    label: 'Day, session, event/attempt wanted',
    required: true,
    squarespaceFieldId: 'textarea-yui_3_17_2_1_1749457434887_7506',
    placeholder: 'Day 1, Session 1, Platform 1, Squat attempt 3',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email for delivery',
    required: true,
    squarespaceFieldId: 'email-yui_3_17_2_1_1749457434887_15169',
    placeholder: 'example@gmail.com',
  },
  {
    key: 'attemptWeightPreference',
    type: 'select',
    label: 'Attempt number / weight used',
    required: false,
    squarespaceFieldId: 'select-yui_3_17_2_1_1754990679122_3551',
    description: 'Would you like the attempt number and weight used included in your videos?',
    options: ['YES', 'NO'],
  },
]

const PHOTO_PACK_FIELDS: CheckoutFieldConfig[] = [
  {
    key: 'competitionName',
    type: 'text',
    label: 'Name of competition',
    required: true,
    squarespaceFieldId: 'text-a675c784-fb84-4888-be76-2e532fd59520',
    placeholder: 'Summer Open 2026',
    description: 'Name of the competition you are competing at',
  },
  {
    key: 'fullName',
    type: 'name',
    label: 'Full name',
    required: true,
    squarespaceFieldId: 'name-yui_3_17_2_1_1750290169026_11445',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email for delivery',
    required: true,
    squarespaceFieldId: 'email-yui_3_17_2_1_1750290169026_12007',
    placeholder: 'example@gmail.com',
  },
]

export const checkoutFieldsByPackageId: Record<string, CheckoutFieldConfig[]> = {
  'bundle-ultimate-all-media': [
    ...HIGHLIGHT_REEL_FIELDS.slice(0, 2),
    {
      key: 'competitionName',
      type: 'text',
      label: 'Name of competition',
      required: true,
      squarespaceFieldId: 'text-223462b3-9281-4a30-9435-e089be9f77ea',
      placeholder: 'Summer Open 2026',
    },
    ...HIGHLIGHT_REEL_FIELDS.slice(3, 6),
    {
      key: 'attemptWeightPreference',
      type: 'select',
      label: 'Attempt number / weight used',
      required: true,
      squarespaceFieldId: 'select-4abda928-9b4d-4cb0-81b9-f116dd1f2845',
      description: 'Would you like the attempt number and weight used included in your videos?',
      options: ['Yes', 'No'],
    },
    {
      key: 'phone',
      type: 'phone',
      label: 'Phone number',
      required: true,
      squarespaceFieldId: 'phone-00f64147-b078-486a-bd76-27e1275e1976',
      description: 'Used only if email delivery/contact does not work.',
    },
    HIGHLIGHT_REEL_FIELDS[6],
  ],
  'bundle-photos-highlight': HIGHLIGHT_REEL_FIELDS,
  'bundle-photos-static': CONTACT_INFO_FIELDS,
  'bundle-highlight-static': HIGHLIGHT_REEL_FIELDS,
  'video-highlight-reel': HIGHLIGHT_REEL_FIELDS,
  'video-9-static': VIDEO_ATTEMPT_FIELDS,
  'video-3-attempts': VIDEO_ATTEMPT_FIELDS,
  'video-single-attempt': VIDEO_ATTEMPT_FIELDS,
  'photo-edited-package': CONTACT_INFO_FIELDS,
  'photo-10-pack': PHOTO_PACK_FIELDS,
  'photo-5-pack': PHOTO_PACK_FIELDS,
  'photo-single': PHOTO_PACK_FIELDS,
  'bench-highlight-reel': HIGHLIGHT_REEL_FIELDS,
  'addon-express-delivery': [],
  'event-last-chance-meet': VIDEO_ATTEMPT_FIELDS,
}

export function getCheckoutFields(packageId: string) {
  return checkoutFieldsByPackageId[packageId] ?? []
}
