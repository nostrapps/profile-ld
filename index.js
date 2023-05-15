#!/usr/bin/env node

export default function profileld (mergedData) {
  const profile = {
    '@context': 'http://schema.org',
    '@id': '',
    '@type': 'Person',
    name: mergedData.name,
    image: mergedData.picture,
    description: mergedData.about,

    mainEntity: {
      '@context': 'https://w3id.org/nostr/context',
      ...mergedData
    }
  }

  if (mergedData.github || mergedData.github) {
    profile.mainEntity.github = mergedData.github
  } else if (mergedData.Github) {
    profile.mainEntity.github = mergedData.Github
  } else if (mergedData.identities && mergedData.identities[0] && mergedData.identities[0].type === 'github') {
    profile.mainEntity.github = 'https://github.com/' + mergedData.identities[0].claim
  }

  return profile
}

const p = {
  '@id': 'nostr:pubkey:e1ff3bfdd4e40315959b08b4fcc8245eaa514637e1d4ec2ae166b743341be1af',
  following: [
    'nostr:pubkey:3efdaebb1d8923ebd99c9e7ace3b4194ab45512e2be79c1b7d68d9243e0d2681',
    'nostr:pubkey:787338757fc25d65cd929394d5e7713cf43638e8d259e8dcf5c73b834eb851f2',
    'nostr:pubkey:17b2cf15b49aba7dcfe827b72ed70690a12e410af19c1654b4a7691bd586976b',
    'nostr:pubkey:b10c0000079a83cf26815dc7538818d8d56a2983e374e30a4143e50060978457',
    'nostr:pubkey:5c10ed0678805156d39ef1ef6d46110fe1e7e590ae04986ccf48ba1299cb53e2'
  ],
  relay: [
    {
      '@id': 'wss://freespeech.casa',
      mode: [
        'read',
        'write'
      ]
    }
  ],
  banner: 'https://benthecarman.com/images/joker.jpeg',
  website: 'https://benthecarman.com',
  reactions: true,
  nip05: '_@benthecarman.com',
  picture: 'https://benthecarman.com/images/me-bear.png',
  lud16: 'me@benthecarman.com',
  display_name: 'Carman 🏴‍☠',
  about: 'Starting a Mutiny',
  name: 'benthecarman'
}

console.log(JSON.stringify(profileld((p)), null, 2))
