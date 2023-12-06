const markerData = [
    {
        "rank": 1,
        "city": "Lima",
        "country": "Peru",
        "name": "Central",
        "placesId": "ChIJ01sth-G3BZERHLHau6WPXV8",
        "latitude": "-12.1526483",
        "longitude": "-77.022457899999992"
    },
    {
        "rank": 2,
        "city": "Barcelona",
        "country": "Spain",
        "name": "Disfrutar",
        "placesId": "ChIJTSzGu4WipBIRkznre9Zwis0",
        "latitude": "41.387762699999996",
        "longitude": "2.153199"
    },
    {
        "rank": 3,
        "city": "Madrid",
        "country": "Spain",
        "name": "DiverXO",
        "placesId": "ChIJfUIagAMpQg0RRYLx9K82nJc",
        "latitude": "40.4578992",
        "longitude": "-3.6857765000000002"
    },
    {
        "rank": 4,
        "city": "Atxondo",
        "country": "Spain",
        "name": "Asador Etxebarri",
        "placesId": "ChIJfwMp6PLSTw0RFlSWXV3fkio",
        "latitude": "43.1158721",
        "longitude": "-2.5984691"
    },
    {
        "rank": 5,
        "city": "Copenhagen",
        "country": "Denmark",
        "name": "Alchemist",
        "placesId": "ChIJGbFWVvBSUkYR5x0i6Z836Ao",
        "latitude": "55.6939651",
        "longitude": "12.6138816"
    },
    {
        "rank": 6,
        "city": "Lima",
        "country": "Peru",
        "name": "Maido",
        "placesId": "ChIJObzkJx_IBZERAQaFKNwiTws",
        "latitude": "-12.125420199999999",
        "longitude": "-77.030574399999992"
    },
    {
        "rank": 7,
        "city": "Gardone Riviera",
        "country": "Italy",
        "name": "Lido 84",
        "placesId": "ChIJx7BJHCKMgUcRA7aurgztHrQ",
        "latitude": "45.6251592",
        "longitude": "10.5755666"
    },
    {
        "rank": 8,
        "city": "New York",
        "country": "USA",
        "name": "ATOMIX",
        "placesId": "ChIJ3bmAHghZwokRRXYO57yLuss",
        "latitude": "40.7442317",
        "longitude": "-73.9828502"
    },
    {
        "rank": 9,
        "city": "Mexico City",
        "country": "Mexico",
        "name": "Quintonil",
        "placesId": "ChIJbS8EZf8B0oURwwD8B0MpqK0",
        "latitude": "19.4308408",
        "longitude": "-99.1917115"
    },
    {
        "rank": 10,
        "city": "Paris",
        "country": "France",
        "name": "Table by Bruno Verjus",
        "placesId": "ChIJoSONvAVy5kcRiFFvBHOUYv8",
        "latitude": "48.848801599999994",
        "longitude": "2.3758486999999997"
    },
    {
        "rank": 11,
        "city": "Dubai",
        "country": "UAE",
        "name": "Trèsind Studio",
        "placesId": "ChIJcfzwzo0TXz4RyQpaHkMBWsE",
        "latitude": "25.114234999999997",
        "longitude": "55.139617400000006"
    },
    {
        "rank": 12,
        "city": "São Paulo",
        "country": "Brazil",
        "name": "A Casa Do Porco",
        "placesId": "ChIJK76a5E5YzpQRCoY7nm1M3-k",
        "latitude": "-23.544913599999997",
        "longitude": "-46.644733599999995"
    },
    {
        "rank": 13,
        "city": "Mexico City",
        "country": "Mexico",
        "name": "Pujol",
        "placesId": "ChIJWZ2zdav40YURFvsU_rU3uaE",
        "latitude": "19.432376299999998",
        "longitude": "-99.1948132"
    },
    {
        "rank": 14,
        "city": "Singapore",
        "country": "Singapore",
        "name": "Odette",
        "placesId": "ChIJbUjtT6cZ2jERJOB8kHFKljI",
        "latitude": "1.2897067",
        "longitude": "103.8514433"
    },
    {
        "rank": 15,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "Le Du",
        "placesId": "ChIJL7-My9KY4jARzlw1ffk9vo8",
        "latitude": "13.7250312",
        "longitude": "100.5293521"
    },
    {
        "rank": 16,
        "city": "Castel di Sangro",
        "country": "Italy",
        "name": "Reale",
        "placesId": "ChIJnxxH1W96MBMRSkUGag8Oltc",
        "latitude": "41.7799897",
        "longitude": "14.0945982"
    },
    {
        "rank": 17,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "Gaggan Anand",
        "placesId": "ChIJi_nHcf-f4jARAI6VOXH0wII",
        "latitude": "13.740783899999998",
        "longitude": "100.56758669999999"
    },
    {
        "rank": 18,
        "city": "Vienna",
        "country": "Austria",
        "name": "Steirereck",
        "placesId": "ChIJKS_u4XYHbUcRFEBBkdJ8HG0",
        "latitude": "48.2044578",
        "longitude": "16.3813958"
    },
    {
        "rank": 19,
        "city": "Buenos Aires",
        "country": "Argentina",
        "name": "Don Julio",
        "placesId": "ChIJoYl36oa1vJURWWhqD9z3UV8",
        "latitude": "-34.5863219",
        "longitude": "-58.4242047"
    },
    {
        "rank": 20,
        "city": "Denia",
        "country": "Spain",
        "name": "Quique Dacosta",
        "placesId": "ChIJU1izUBkbnhIRfn-1gHM6C8Y",
        "latitude": "38.8537422",
        "longitude": "0.0851913"
    },
    {
        "rank": 21,
        "city": "Tokyo",
        "country": "Japan",
        "name": "Den",
        "placesId": "ChIJKxOIF5iMGGARiFoVm5Ay8W4",
        "latitude": "35.6731762",
        "longitude": "139.71272159999998"
    },
    {
        "rank": 22,
        "city": "Getaria",
        "country": "Spain",
        "name": "ELKANO",
        "placesId": "ChIJH9GgGaLIUQ0RhEde7VfKpQI",
        "latitude": "43.303045499999996",
        "longitude": "-2.2049776999999997"
    },
    {
        "rank": 23,
        "city": "London",
        "country": "United Kingdom",
        "name": "Kol",
        "placesId": "ChIJvfnOCgUbdkgR3FvbixhS2cw",
        "latitude": "51.5147644",
        "longitude": "-0.15752239999999998"
    },
    {
        "rank": 24,
        "city": "Paris",
        "country": "France",
        "name": "Septime",
        "placesId": "ChIJE6kCUghy5kcRmWSg3RUHIwM",
        "latitude": "48.853572299999996",
        "longitude": "2.3809332999999997"
    },
    {
        "rank": 25,
        "city": "Lisbon",
        "country": "Portugal",
        "name": "Belcanto",
        "placesId": "ChIJITj75340GQ0RXULVgWMFloA",
        "latitude": "38.7100994",
        "longitude": "-9.1414656"
    },
    {
        "rank": 26,
        "city": "Fürstenau",
        "country": "Switzerland",
        "name": "Schauenstein Castle",
        "placesId": "ChIJmdeEklvqhEcRnfl0CO7_szw",
        "latitude": "46.721331899999996",
        "longitude": "9.4462396"
    },
    {
        "rank": 27,
        "city": "Tokyo",
        "country": "Japan",
        "name": "Florilège",
        "placesId": "ChIJhU8r4Ba6JhUR2uFksk0mpCg",
        "latitude": "35.661609299999995",
        "longitude": "139.7434466"
    },
    {
        "rank": 28,
        "city": "Lima",
        "country": "Peru",
        "name": "Kjolle",
        "placesId": "ChIJr1L1USC3BZEREp0Z1sp3AeU",
        "latitude": "-12.152904",
        "longitude": "-77.022542399999992"
    },
    {
        "rank": 29,
        "city": "Santiago",
        "country": "Chile",
        "name": "Boragó",
        "placesId": "ChIJxSErG0jPYpYRoyEeWBQK0Dk",
        "latitude": "-33.3825101",
        "longitude": "-70.58409189999999"
    },
    {
        "rank": 30,
        "city": "Stockholm",
        "country": "Sweden",
        "name": "Frantzén",
        "placesId": "ChIJhwomM2edX0YR9gW2q53gJRg",
        "latitude": "59.3339101",
        "longitude": "18.058612399999998"
    },
    {
        "rank": 31,
        "city": "San Sebastian",
        "country": "Spain",
        "name": "Mugaritz",
        "placesId": "ChIJrbLj_tauUQ0RpCer8fGceF8",
        "latitude": "43.2724044",
        "longitude": "-1.9172118000000002"
    },
    {
        "rank": 32,
        "city": "Kobarid",
        "country": "Slovenia",
        "name": "Hiša Franko",
        "placesId": "ChIJg2ySsFBbekcR-PLGw2nIRAY",
        "latitude": "46.2472492",
        "longitude": "13.5377614"
    },
    {
        "rank": 33,
        "city": "Bogotá",
        "country": "Colombia",
        "name": "El Chato",
        "placesId": "ChIJQclc-kSaP44RJgBygHivOB4",
        "latitude": "4.6478318",
        "longitude": "-74.0570942"
    },
    {
        "rank": 34,
        "city": "Senigallia",
        "country": "Italy",
        "name": "Uliassi",
        "placesId": "ChIJcR28_J1zLRMRk_P3vABNEog",
        "latitude": "43.719463100000006",
        "longitude": "13.2208132"
    },
    {
        "rank": 35,
        "city": "London",
        "country": "United Kingdom",
        "name": "Ikoyi",
        "placesId": "ChIJkw2CZtEEdkgRgiNBxbdniHE",
        "latitude": "51.5124247",
        "longitude": "-0.11505539999999997"
    },
    {
        "rank": 36,
        "city": "Paris",
        "country": "France",
        "name": "Plénitude",
        "placesId": "ChIJ1YFmqNZv5kcRBAVR2JH8pEo",
        "latitude": "48.8588971",
        "longitude": "2.3420459"
    },
    {
        "rank": 37,
        "city": "Tokyo",
        "country": "Japan",
        "name": "SÉZANNE",
        "placesId": "ChIJ-4nJtO-LGGARLkDEsx6UD4g",
        "latitude": "35.6780884",
        "longitude": "139.7668704"
    },
    {
        "rank": 38,
        "city": "London",
        "country": "United Kingdom",
        "name": "The Clove Club",
        "placesId": "ChIJkbGoX7ocdkgRgfrpjeC7xzM",
        "latitude": "51.5270972",
        "longitude": "-0.079338499999999992"
    },
    {
        "rank": 39,
        "city": "Antwerp",
        "country": "Belgium",
        "name": "The Jane",
        "placesId": "ChIJvQDh9hj3w0cRPe9AMD95QGw",
        "latitude": "51.2024803",
        "longitude": "4.4234504999999995"
    },
    {
        "rank": 40,
        "city": "Berlin",
        "country": "Germany",
        "name": "Restaurant Tim Raue",
        "placesId": "ChIJpdyYVNFRqEcRFTrYsDXDrY4",
        "latitude": "52.5068948",
        "longitude": "13.3914718"
    },
    {
        "rank": 41,
        "city": "Rubano",
        "country": "Italy",
        "name": "Le Calandre",
        "placesId": "ChIJRwG9TKLZfkcRqCF9Hf_ANrk",
        "latitude": "45.4217428",
        "longitude": "11.8096337"
    },
    {
        "rank": 42,
        "city": "Alba",
        "country": "Italy",
        "name": "Piazza Duomo",
        "placesId": "ChIJSw-GLl2z0hIRX8zyKXltoq8",
        "latitude": "44.7006136",
        "longitude": "8.0357954"
    },
    {
        "rank": 43,
        "city": "Bogotá",
        "country": "Colombia",
        "name": "Leo",
        "placesId": "ChIJf0x6pJuZP44RbF-3kBjiZLs",
        "latitude": "4.6480804",
        "longitude": "-74.0564509"
    },
    {
        "rank": 44,
        "city": "New York",
        "country": "USA",
        "name": "Le Bernardin",
        "placesId": "ChIJ7zfF7fhYwokRMba4KkIGreU",
        "latitude": "40.761569099999996",
        "longitude": "-73.981804799999992"
    },
    {
        "rank": 45,
        "city": "Berlin",
        "country": "Germany",
        "name": "Nobelhart & Schmutzig",
        "placesId": "ChIJNdtTjdNRqEcR-n4Xa0Y92G4",
        "latitude": "52.505336899999996",
        "longitude": "13.3904178"
    },
    {
        "rank": 46,
        "city": "Dubai",
        "country": "UAE",
        "name": "ORFALI BROS",
        "placesId": "ChIJv6Zm1-hDXz4R9c0k9cOGun4",
        "latitude": "25.2186594",
        "longitude": "55.2612762"
    },
    {
        "rank": 47,
        "city": "Lima",
        "country": "Peru",
        "name": "Mayta",
        "placesId": "ChIJqz8RPjbIBZERTyuxNQ8LNHs",
        "latitude": "-12.1098839",
        "longitude": "-77.0492013"
    },
    {
        "rank": 48,
        "city": "La Madelaine-sous-Montreuil",
        "country": "France",
        "name": "La Grenouillère",
        "placesId": "ChIJjQ5C4dfF3UcRtvuEJhbVPk8",
        "latitude": "50.4710611",
        "longitude": "1.75445"
    },
    {
        "rank": 49,
        "city": "Mexico City",
        "country": "Mexico",
        "name": "Rosetta",
        "placesId": "ChIJdSGAWgP_0YURwNtY7rftf2E",
        "latitude": "19.4197758",
        "longitude": "-99.1598009"
    },
    {
        "rank": 50,
        "city": "Hong Kong",
        "country": "China",
        "name": "The Chairman",
        "placesId": "ChIJhcOtY3wABDQR39uGw41EIYM",
        "latitude": "22.2848237",
        "longitude": "114.1530091"
    },
    {
        "rank": 51,
        "city": "Tokyo",
        "country": "Japan",
        "name": "Narisawa",
        "placesId": "ChIJrbAVNIOMGGARXNvkApcqvng",
        "latitude": "35.6716221",
        "longitude": "139.7221161"
    },
    {
        "rank": 52,
        "city": "Kruisem",
        "country": "Belgium",
        "name": "Hof Van Cleve",
        "placesId": "ChIJ6U6ntWgUw0cRZrq8q_ohqUU",
        "latitude": "50.903667299999995",
        "longitude": "3.5096569"
    },
    {
        "rank": 53,
        "city": "London",
        "country": "United Kingdom",
        "name": "BRAT",
        "placesId": "ChIJ7XVltrAcdkgRISmskLX7lbw",
        "latitude": "51.5242042",
        "longitude": "-0.0767031"
    },
    {
        "rank": 54,
        "city": "Guadalajara",
        "country": "Mexico",
        "name": "Alcalde",
        "placesId": "ChIJSxhI0W6uKIQRLbizqZhTQuQ",
        "latitude": "20.6793273",
        "longitude": "-103.3897964"
    },
    {
        "rank": 55,
        "city": "Berlin",
        "country": "Germany",
        "name": "ernst",
        "placesId": "ChIJPRZ4_4ZRqEcR9qi3nBW3vTc",
        "latitude": "52.5446886",
        "longitude": "13.3680205"
    },
    {
        "rank": 56,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "Sorn",
        "placesId": "ChIJWfYJ3QWf4jAR9erXv7kK7sA",
        "latitude": "13.723134300000002",
        "longitude": "100.5684649"
    },
    {
        "rank": 57,
        "city": "Copenhagen",
        "country": "Denmark",
        "name": "Jordnær",
        "placesId": "ChIJWxyiJPFNUkYRTp10-YnYcNg",
        "latitude": "55.748298899999995",
        "longitude": "12.5412079"
    },
    {
        "rank": 58,
        "city": "Rio de Janeiro",
        "country": "Brazil",
        "name": "Lasai",
        "placesId": "ChIJhWl8Qd5_mQAR-xc4FQjSFaQ",
        "latitude": "-22.953308099999997",
        "longitude": "-43.1963114"
    },
    {
        "rank": 59,
        "city": "Lima",
        "country": "Peru",
        "name": "Mérito",
        "placesId": "ChIJJW2CECq3BZER0acewjEiZZ8",
        "latitude": "-12.1504944",
        "longitude": "-77.020754"
    },
    {
        "rank": 60,
        "city": "Osaka",
        "country": "Japan",
        "name": "La Cime",
        "placesId": "ChIJJQbuz-HmAGARlT3utlf3bPA",
        "latitude": "34.685815",
        "longitude": "135.50342899999998"
    },
    {
        "rank": 61,
        "city": "New York",
        "country": "USA",
        "name": "Chef's Table at Brooklyn Fare",
        "placesId": "ChIJiVVSAE1awokRzdvqVP_z3aA",
        "latitude": "40.7561213",
        "longitude": "-73.9965897"
    },
    {
        "rank": 62,
        "city": "Paris",
        "country": "France",
        "name": "Arpège",
        "placesId": "ChIJQ-oAFypw5kcR2T9NszPcZO4",
        "latitude": "48.855787400000004",
        "longitude": "2.3170682"
    },
    {
        "rank": 63,
        "city": "Istanbul",
        "country": "Turkey",
        "name": "Neolokal",
        "placesId": "ChIJGbaw0-e5yhQRXCPUhlJLb8w",
        "latitude": "41.0238362",
        "longitude": "28.9734027"
    },
    {
        "rank": 64,
        "city": "El Puerto de Santa María",
        "country": "Spain",
        "name": "Aponiente",
        "placesId": "ChIJS8jxvenPDQ0Rl6kdS43TPQc",
        "latitude": "36.6031417",
        "longitude": "-6.2164110999999993"
    },
    {
        "rank": 65,
        "city": "Singapore",
        "country": "Singapore",
        "name": "Burnt Ends",
        "placesId": "ChIJLZ9DYnIZ2jERQ51Am7WzJLM",
        "latitude": "1.304606",
        "longitude": "103.8089925"
    },
    {
        "rank": 66,
        "city": "Istanbul",
        "country": "Turkey",
        "name": "TURK FATIH TUTAK",
        "placesId": "ChIJhazqsPa3yhQRWNzo3ScR25k",
        "latitude": "41.058341899999995",
        "longitude": "28.977767299999996"
    },
    {
        "rank": 67,
        "city": "Paris",
        "country": "France",
        "name": "Le Clarence",
        "placesId": "ChIJH5K8McVv5kcRHrJn-zUA3KQ",
        "latitude": "48.8674268",
        "longitude": "2.3097738999999997"
    },
    {
        "rank": 68,
        "city": "Healdsburg",
        "country": "USA",
        "name": "SingleThread",
        "placesId": "ChIJ8TVwjTMXhIARQ5MLkvMyVvY",
        "latitude": "38.6123026",
        "longitude": "-122.86970319999999"
    },
    {
        "rank": 69,
        "city": "Singapore",
        "country": "Singapore",
        "name": "Zén",
        "placesId": "ChIJpxlhJpkZ2jER7gzIjfgz8co",
        "latitude": "1.2794687",
        "longitude": "103.84036069999999"
    },
    {
        "rank": 70,
        "city": "Mexico City",
        "country": "Mexico",
        "name": "Sud 777",
        "placesId": "ChIJNTreqsH_zYUR82jk2MVoXMM",
        "latitude": "19.3090281",
        "longitude": "-99.2093428"
    },
    {
        "rank": 71,
        "city": "London",
        "country": "United Kingdom",
        "name": "Core by Clare Smyth",
        "placesId": "ChIJVVU8V-IPdkgRzKjRtNrdvDw",
        "latitude": "51.5127727",
        "longitude": "-0.2031335"
    },
    {
        "rank": 72,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "Sühring",
        "placesId": "ChIJa4FyWkef4jARYosTC995W8U",
        "latitude": "13.7108133",
        "longitude": "100.54548709999999"
    },
    {
        "rank": 73,
        "city": "New York",
        "country": "USA",
        "name": "Cosme",
        "placesId": "ChIJT-gYZKFZwokR7O8LLYuYMjU",
        "latitude": "40.7395952",
        "longitude": "-73.988356400000015"
    },
    {
        "rank": 74,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "Nusara",
        "placesId": "ChIJe_d6d0OZ4jARL0uQgNHQRPI",
        "latitude": "13.7457026",
        "longitude": "100.49152819999999"
    },
    {
        "rank": 75,
        "city": "Cape Town",
        "country": "South Africa",
        "name": "Fyn",
        "placesId": "ChIJJXjP9dFnzB0RKRtezQrweYM",
        "latitude": "-33.924723",
        "longitude": "18.421803099999998"
    },
    {
        "rank": 76,
        "city": "Rio de Janeiro",
        "country": "Brazil",
        "name": "Oteque",
        "placesId": "ChIJ5fVh-99_mQAR2tg86ZD30iA",
        "latitude": "-22.957444499999998",
        "longitude": "-43.1942978"
    },
    {
        "rank": 77,
        "city": "Munich",
        "country": "Germany",
        "name": "Tantris",
        "placesId": "ChIJtSGICsp1nkcRsO8j0sObIio",
        "latitude": "48.169796",
        "longitude": "11.588339"
    },
    {
        "rank": 78,
        "city": "Paris",
        "country": "France",
        "name": "Alléno Paris au Pavillon Ledoyen",
        "placesId": "ChIJt_i_hmdv5kcRmMIR274srQM",
        "latitude": "48.8661356",
        "longitude": "2.3163359000000003"
    },
    {
        "rank": 79,
        "city": "Quito",
        "country": "Ecuador",
        "name": "NUEMA",
        "placesId": "ChIJ8Wv4QnmZ1ZERpY0fkRPP5fE",
        "latitude": "-0.19824599999999998",
        "longitude": "-78.4825388"
    },
    {
        "rank": 80,
        "city": "Megève",
        "country": "France",
        "name": "Flocons de Sel",
        "placesId": "ChIJM0LQH8nii0cROLdlnWoFi0g",
        "latitude": "45.8302798",
        "longitude": "6.5968981"
    },
    {
        "rank": 81,
        "city": "Larrabetzu",
        "country": "Spain",
        "name": "Azurmendi",
        "placesId": "ChIJCeEOclRITg0R_hLIpCMim5A",
        "latitude": "43.2605569",
        "longitude": "-2.8160298"
    },
    {
        "rank": 82,
        "city": "Barcelona",
        "country": "Spain",
        "name": "Enigma",
        "placesId": "ChIJA6vUunyipBIRMtoRD_vIbII",
        "latitude": "41.376723399999996",
        "longitude": "2.1540984"
    },
    {
        "rank": 83,
        "city": "Tokyo",
        "country": "Japan",
        "name": "Sazenka",
        "placesId": "ChIJqZDavAuLGGARV-fj_CVDFnI",
        "latitude": "35.6495743",
        "longitude": "139.728363"
    },
    {
        "rank": 84,
        "city": "Singapore",
        "country": "Singapore",
        "name": "Meta",
        "placesId": "ChIJ6WJrhG0Z2jERFtVbDrD08jM",
        "latitude": "1.2939003999999998",
        "longitude": "103.8418116"
    },
    {
        "rank": 85,
        "city": "Milan",
        "country": "Italy",
        "name": "Enrico Bartolini",
        "placesId": "ChIJr54jbebDhkcRlR68yNtO368",
        "latitude": "45.4515503",
        "longitude": "9.1616272"
    },
    {
        "rank": 86,
        "city": "London",
        "country": "United Kingdom",
        "name": "Lyle's",
        "placesId": "ChIJzTzkzLAcdkgRbwmAyPCNQ9o",
        "latitude": "51.5237542",
        "longitude": "-0.0764767"
    },
    {
        "rank": 87,
        "city": "Dubai",
        "country": "UAE",
        "name": "Ossiano",
        "placesId": "ChIJWZ-dSD4VXz4RZLBaXNzgUuk",
        "latitude": "25.131245999999997",
        "longitude": "55.1175734"
    },
    {
        "rank": 88,
        "city": "Bangkok",
        "country": "Thailand",
        "name": "POTONG",
        "placesId": "ChIJd7grWxeZ4jAR8KwClMpGmHo",
        "latitude": "13.739154899999999",
        "longitude": "100.5084933"
    },
    {
        "rank": 89,
        "city": "Seoul",
        "country": "South Korea",
        "name": "Mingles",
        "placesId": "ChIJjXuM24mjfDURSwmouRnxNlM",
        "latitude": "37.5253386",
        "longitude": "127.04414519999999"
    },
    {
        "rank": 90,
        "city": "Hong Kong",
        "country": "China",
        "name": "WING",
        "placesId": "ChIJ9TB5jAcBBDQREQJ8mH5EaVw",
        "latitude": "22.2849134",
        "longitude": "114.152875"
    },
    {
        "rank": 91,
        "city": "Copenhagen",
        "country": "Denmark",
        "name": "Kadeau",
        "placesId": "ChIJ1Y52MZlTUkYRuDl4FNhYh_U",
        "latitude": "55.6722944",
        "longitude": "12.5889809"
    },
    {
        "rank": 92,
        "city": "Hong Kong",
        "country": "China",
        "name": "Neighborhood",
        "placesId": "ChIJq5eqgnsABDQRAxupXLYqR4U",
        "latitude": "22.283074199999998",
        "longitude": "114.15290279999999"
    },
    {
        "rank": 93,
        "city": "Paris",
        "country": "France",
        "name": "Kei",
        "placesId": "ChIJqTnaAiNu5kcRQsRFgf8qeoA",
        "latitude": "48.864357999999996",
        "longitude": "2.3420826999999997"
    },
    {
        "rank": 94,
        "city": "Cape Town",
        "country": "South Africa",
        "name": "La Colombe",
        "placesId": "ChIJCWq-g2FCzB0R4RYvykSREW4",
        "latitude": "-34.0151706",
        "longitude": "18.4033113"
    },
    {
        "rank": 95,
        "city": "Roquebrune-Cap-Martin",
        "country": "France",
        "name": "Ceto",
        "placesId": "ChIJfXEJp27pzRIRyaynMnZxhYs",
        "latitude": "43.756658099999996",
        "longitude": "7.4443827999999987"
    },
    {
        "rank": 96,
        "city": "Valencia",
        "country": "Spain",
        "name": "Ricard Camarena",
        "placesId": "ChIJDXL1jclIYA0RjKrQUUOSQkw",
        "latitude": "39.485391299999996",
        "longitude": "-0.3850954"
    },
    {
        "rank": 97,
        "city": "Singapore",
        "country": "Singapore",
        "name": "Labyrinth",
        "placesId": "ChIJj99Fo3IZ2jERFIUg_m-VhO8",
        "latitude": "1.2897489",
        "longitude": "103.85629759999999"
    },
    {
        "rank": 98,
        "city": "San Francisco",
        "country": "USA",
        "name": "Saison",
        "placesId": "ChIJPUo32Aj3MhURXL06eVIEoHc",
        "latitude": "37.779522799999995",
        "longitude": "-122.39226909999998"
    },
    {
        "rank": 99,
        "city": "Shanghai",
        "country": "China",
        "name": "Fu He Hui",
        "placesId": "ChIJNZenaONlsjURk5lrxUnMSZU",
        "latitude": "31.218621299999995",
        "longitude": "121.4296926"
    },
    {
        "rank": 100,
        "city": "Panama City",
        "country": "Panama",
        "name": "Maito",
        "placesId": "ChIJOxrVAgqprI8RD5aEG4VatXA",
        "latitude": "8.9943744",
        "longitude": "-79.498003799999992"
    }
]

export default markerData;
