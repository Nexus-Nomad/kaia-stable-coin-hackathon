import { GasOptions } from '../types/wallet.types';

// Kaia DID 컨트랙트 설정
export const KAIA_DID_CONTRACT = {
  address: '0xf2556D5ce076afCbFEC583EBc0876f68FC39329A' as const,
  deploymentTx:
    '0x4c095abf8945fd30e88f4c5ffc511d8c42d10093872b25e5c3b44a699873b148' as const,
};

// 최신 KaiaDID ABI
export const KAIA_DID_ABI = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createDID',
    inputs: [
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_birthDate',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_homeAddress',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_phone',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deactivateLatestDID',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'didDocumentHistory',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'birthDate',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'homeAddress',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'phone',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'isActive',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'createdAt',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'updatedAt',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'version',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllActiveDIDAddresses',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllDIDHistory',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct KaiaDID3.DIDDocument[]',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'birthDate',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'homeAddress',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'phone',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'isActive',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'createdAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'version',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllRegisteredAddresses',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDIDByVersion',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'version',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct KaiaDID3.DIDDocument',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'birthDate',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'homeAddress',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'phone',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'isActive',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'createdAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'version',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDIDVersionCount',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLatestDID',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct KaiaDID3.DIDDocument',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'birthDate',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'homeAddress',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'phone',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'isActive',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'createdAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'version',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMyAllDIDHistory',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct KaiaDID3.DIDDocument[]',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'birthDate',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'homeAddress',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'phone',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'isActive',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'createdAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'version',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMyLatestDID',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct KaiaDID3.DIDDocument',
        components: [
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'birthDate',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'homeAddress',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'phone',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'isActive',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'createdAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'version',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalActiveDIDs',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalRegisteredAddresses',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hasActiveDIDPublic',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hasRegistered',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'registeredAddresses',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateDID',
    inputs: [
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_birthDate',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_homeAddress',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_phone',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'DIDCreated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'version',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DIDDeactivated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'version',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DIDUpdated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'name',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'version',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
] as const;

/**
 * Kaia 네트워크 최적화된 Gas 설정
 *
 * 각 작업별로 실제 사용량 기반으로 최적화된 Gas limit 설정
 * Kaia 네트워크 표준 Gas price (25 Gwei) 사용
 */
export const GAS_CONFIG: GasOptions = {
  // === 기본 설정 ===
  gasLimit: '2000000', // 2M - 복잡한 트랜잭션용
  gasPrice: '25000000000', // 25 Gwei - Kaia 네트워크 표준

  // === DID 관련 트랜잭션 ===
  issueIdentity: {
    gasLimit: '350000', // 350K - 신분증 발급 (createDID)
    gasPrice: '25000000000', // 25 Gwei
  },

  updateDID: {
    gasLimit: '250000', // 250K - DID 정보 업데이트
    gasPrice: '25000000000', // 25 Gwei
  },

  deactivateDID: {
    gasLimit: '150000', // 150K - DID 비활성화 (가장 단순)
    gasPrice: '25000000000', // 25 Gwei
  },
};
