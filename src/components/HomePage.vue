<template>
  <div class="wrap">
    <div class="header">
        <div class="profile">
          <img alt="ai" src="../assets/profile2.jpg">
          <P class="name">THEA VANNAK</P>
        </div>
        <div class="search">
          <input class="search-txt" type="data" placeholder="Search here" v-model="search">
        </div>
  </div>   
    <div class="main-containt">
      <h2>List countries in the world</h2>
      <table style="width:100%">
        <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>2 charchter Country</th>
          <th>3 charchter Country Code</th>
          <th>Native Name</th> 
          <th>Alternative</th>
          <th>Country Calling Codes</th>
        </tr>
        <tr v-for="data in filterTableData" :key="data">
          <!--{{data}}-->
          <td><img :src="data.image" alt=""></td>
          <td>{{data.name}}</td>
          <td>{{data.countryCode2}}</td>
          <td>{{data.countryCode3}}</td>
          <td>{{data.nativeName}}</td>
          <td>{{data.alternative}}</td>
          <td>{{data.countryCalling}}</td>
        </tr>
      </table>
    </div>
  </div>
  {{numberComputed}}
  {{number}}
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  setup() {
    const tableData = [
      {
        image: require('@/assets/flag/01.Aland-Islands.png'),
        name: 'French Polynesiay',
        countryCode2: 'AX',
        countryCode3: 'ALA',
        nativeName: '',
        alternative: 'AX,Aaland,Aland,Ahvenanmaa',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/02.American-Samoa.png'),
        name: 'American Samoa',
        countryCode2: 'AS',
        countryCode3: 'ASM',
        nativeName: '',
        alternative: 'AS,Amerika Sāmoa,Amelika Sāmoa,Sāmoa Amelika',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/03.Anguilla.png'),
        name: 'Anguilla',
        countryCode2: 'AI',
        countryCode3: 'AIA',
        nativeName: '',
        alternative: 'AI',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/04.Antarctica.png'),
        name: 'Antarctica',
        countryCode2: 'AQ',
        countryCode3: 'ATA',
        nativeName: '',
        alternative: 'AQ',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/05.ab.png'),
        name: 'Antigua and Barbuda',
        countryCode2: 'AG',
        countryCode3: 'ATG',
        nativeName: '',
        alternative: 'AG',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/06.Egypt.png'),
        name: 'Arab Republic of Egypt',
        countryCode2: 'EG',
        countryCode3: 'EGY',
        nativeName: '',
        alternative: 'EG,Arab Republic of Egypt',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/07.Argentine-Republic.png'),
        name: 'Argentine Republic',
        countryCode2: 'AR',
        countryCode3: 'ARG',
        nativeName: '',
        alternative: 'AR,Argentine Republic,República Argentina',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/08.Aruba.png'),
        name: 'Aruba',
        countryCode2: 'AW',
        countryCode3: 'ABW',
        nativeName: '',
        alternative: 'AW',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/09.Guernsey.png'),
        name: 'Bailiwick of Guernsey',
        countryCode2: 'GG',
        countryCode3: 'GGY',
        nativeName: '',
        alternative: 'GG,Bailiwick of Guernsey,Bailliage de Guernesey	',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/10.Bailiwick-of-Jersey.png'),
        name: 'Bailiwick of Jersey',
        countryCode2: 'JE',
        countryCode3: 'JEY',
        nativeName: '',
        alternative: 'JE,Bailiwick of Jersey,Bailliage de Jersey,Bailliage dé Jèrri',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/11.Barbados.png'),
        name: 'Barbados',
        countryCode2: 'BB',
        countryCode3: 'BRB',
        nativeName: '',
        alternative: 'BB',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/12.Belize.png'),
        name: 'Belize',
        countryCode2: 'BZ',
        countryCode3: 'BLZ',
        nativeName: '',
        alternative: 'BZ',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/13.Bermuda.png'),
        name: 'Bermuda',
        countryCode2: 'BM',
        countryCode3: 'BMU',
        nativeName: '',
        alternative: 'BM,The Islands of Bermuda,The Bermudas,Somers Isles',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/14.Bolivarian-Republic-of-Venezuela.png'),
        name: 'Bolivarian Republic of Venezuela',
        countryCode2: 'VE',
        countryCode3: 'VEN',
        nativeName: '',
        alternative: 'VE,Bolivarian Republic of Venezuela,Venezuela, Bolivarian Republic of,República Bolivariana de Venezuela',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/15.Saba.png'),
        name: 'Bonaire, Sint Eustatius and Saba',
        countryCode2: 'BQ',
        countryCode3: 'BES',
        nativeName: '',
        alternative: 'BES islands',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/16.Bosnia-and-Herzegovina.png'),
        name: 'Bosnia and Herzegovina',
        countryCode2: 'BA',
        countryCode3: 'BIH',
        nativeName: '',
        alternative: 'BA,Bosnia-Herzegovina,Босна и Херцеговина',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/17.Bouvet-Island.png'),
        name: 'Bouvet Island	',
        countryCode2: 'BV',
        countryCode3: 'BVT',
        nativeName: '',
        alternative: '	BV,Bouvetøya,Bouvet-øya',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/18.British-Indian.png'),
        name: 'British Indian Ocean Territory',
        countryCode2: 'IO',
        countryCode3: 'IOT',
        nativeName: '',
        alternative: 'IO',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/19.Burkina-Faso.png'),
        name: 'Burkina Faso',
        countryCode2: 'BF',
        countryCode3: 'BFA',
        nativeName: '',
        alternative: 'BF',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/20.Canada.png'),
        name: 'Canada',
        countryCode2: 'CA',
        countryCode3: 'CAN',
        nativeName: '',
        alternative: 'CA',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/21.Cayman-Islands.png'),
        name: 'Cayman Islands	',
        countryCode2: 'KY',
        countryCode3: 'CYM',
        nativeName: '',
        alternative: 'KY',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/22.Central-African-Republic.png'),
        name: 'Central African Republic',
        countryCode2: 'CF',
        countryCode3: 'CAF',
        nativeName: '',
        alternative: 'CF,Central African Republic,République centrafricaine',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/23.Co-operative-Republic-of-Guyana.png'),
        name: 'Co-operative Republic of Guyana',
        countryCode2: 'GY',
        countryCode3: 'GUY',
        nativeName: '',
        alternative: 'GY,Co-operative Republic of Guyana',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/24.Collectivity-of-Saint-Barthélemy.png'),
        name: 'Collectivity of Saint Barthélemy',
        countryCode2: 'BL',
        countryCode3: 'BLM',
        nativeName: '',
        alternative: 'BL,St. Barthelemy,Collectivity of Saint Barthélemy,Collectivité de Saint-Barthélemy',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/25.Australia.png'),
        name: 'Commonwealth of Australia',
        countryCode2: 'AU',
        countryCode3: 'AUS',
        nativeName: '',
        alternative: 'AU',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/26.Commonwealth-of-Dominica.png'),
        name: 'Commonwealth of Dominica',
        countryCode2: 'DM',
        countryCode3: 'DMA',
        nativeName: '',
        alternative: 'DM,Dominique,Wai‘tu kubuli,Commonwealth of Dominica',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/27.Commonwealth-of-Puerto-Rico.png'),
        name: 'Commonwealth of Puerto Rico',
        countryCode2: 'PR',
        countryCode3: 'PRI',
        nativeName: '',
        alternative: 'PR,Commonwealth of Puerto Rico,Estado Libre Asociado de Puerto Rico',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/28.Commonwealth-of-the-Bahamas.png'),
        name: 'Commonwealth of the Bahamas',
        countryCode2: 'BS',
        countryCode3: 'BHS',
        nativeName: '',
        alternative: 'BS,Commonwealth of the Bahamas',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/30.Mariana-Islands.png'),
        name: 'Commonwealth of the Northern Mariana Islands',
        countryCode2: 'MP',
        countryCode3: 'MNP',
        nativeName: '',
        alternative: 'MP,Commonwealth of the Northern Mariana Islands,Sankattan Siha Na Islas Mariånas',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/31.Cook-Islands.png'),
        name: 'Cook Islands',
        countryCode2: 'CK',
        countryCode3: 'COK',
        nativeName: '',
        alternative: 'CK,Kūki Āirani',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/32.Curacaoy.png'),
        name: 'Country of Curaçao',
        countryCode2: 'CW',
        countryCode3: 'CUW',
        nativeName: '',
        alternative: 'CW,Curacao,Kòrsou,Country of Curaçao,Land Curaçao,Pais Kòrsou',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/33.Czech-Republic.png'),
        name: 'Czech Republic',
        countryCode2: 'CZ',
        countryCode3: 'CZE',
        nativeName: '',
        alternative: 'CZ,Česká republika,Česko',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/34.Korea.png'),
        name: "Democratic People's Republic of Korea",
        countryCode2: 'KP',
        countryCode3: 'PRK',
        nativeName: '',
        alternative: "KP,Democratic People's Republic of Korea,DPRK,조선민주주의인민공화국,Chosŏn Minjujuŭi Inmin Konghwaguk,Korea, Democratic People's Republic of,북한,북조선",
        countryCalling: '+8'
      },
      {
        image: require('@/assets/flag/35.Príncipe.png'),
        name: 'Democratic Republic of São Tomé and Príncipe',
        countryCode2: 'ST',
        countryCode3: 'STP',
        nativeName: '',
        alternative: 'ST,Democratic Republic of São Tomé and Príncipe,Sao Tome and Principe,República Democrática de São Tomé e Príncipe',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/36.Congo.png'),
        name: 'Democratic Republic of the Congo',
        countryCode2: 'CD',
        countryCode3: 'COD',
        nativeName: '',
        alternative: 'CD,DR Congo,Congo-Kinshasa,Congo, the Democratic Republic of the,DRC',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/37.Timor-Leste.png'),
        name: 'Democratic Republic of Timor-Leste',
        countryCode2: 'TL',
        countryCode3: 'TLS',
        nativeName: '',
        alternative: "TL,East Timor,Democratic Republic of Timor-Leste,República Democrática de Timor-Leste,Repúblika Demokrátika Timór-Leste,Timór Lorosa'e,Timor Lorosae",
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/38.Sri-Lanka.png'),
        name: 'Democratic Socialist Republic of Sri Lanka',
        countryCode2: 'LK',
        countryCode3: 'LKA',
        nativeName: '',
        alternative: 'LK,ilaṅkai,Democratic Socialist Republic of Sri Lanka',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/39.Department-of-Mayotte.png'),
        name: 'Department of Mayotte',
        countryCode2: 'YT',
        countryCode3: 'MYT',
        nativeName: '',
        alternative: 'YT,Department of Mayotte,Département de Mayotte',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/40.Dominican-Republic.png'),
        name: 'Dominican Republic',
        countryCode2: 'DO',
        countryCode3: 'DOM',
        nativeName: '',
        alternative: 'DO',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/41.Falkland-Islands.png'),
        name: 'Falkland Islands',
        countryCode2: 'FK',
        countryCode3: 'FLK',
        nativeName: '',
        alternative: 'FK,Islas Malvinas,Falkland Islands (Malvinas)',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/42.Faroe-Islands.png'),
        name: 'Faroe Islands',
        countryCode2: 'FO',
        countryCode3: 'FRO',
        nativeName: '',
        alternative: 'FO,Føroyar,Færøerne',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/43.Ethiopia.png'),
        name: 'Federal Democratic Republic of Ethiopia',
        countryCode2: 'ET',
        countryCode3: 'ETH',
        nativeName: '',
        alternative: 'ET,ʾĪtyōṗṗyā,Federal Democratic Republic of Ethiopia,የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/44.Nepal.png'),
        name: 'Federal Democratic Republic of Nepal',
        countryCode2: 'NP',
        countryCode3: 'NPL',
        nativeName: '',
        alternative: 'NP,Federal Democratic Republic of Nepal,Loktāntrik Ganatantra Nepāl',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/45.Germany.png'),
        name: 'Federal Republic of Germany',
        countryCode2: 'DE',
        countryCode3: 'DEU',
        nativeName: '',
        alternative: 'DE,Federal Republic of Germany,Bundesrepublik Deutschland',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/46.Nigeria.png'),
        name: 'Federal Republic of Nigeria',
        countryCode2: 'NG',
        countryCode3: 'NGA',
        nativeName: '',
        alternative: 'NG,Nijeriya,Naíjíríà,Federal Republic of Nigeria',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/47.Somalia.png'),
        name: 'Federal Republic of Somalia',
        countryCode2: 'SO',
        countryCode3: 'SOM',
        nativeName: '',
        alternative: 'SO,aṣ-Ṣūmāl,Federal Republic of Somalia,Jamhuuriyadda Federaalka Soomaaliya,Jumhūriyyat aṣ-Ṣūmāl al-Fiderāliyya',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/48.Micronesia.png'),
        name: 'Federated States of Micronesia',
        countryCode2: 'FM',
        countryCode3: 'FSM',
        nativeName: '',
        alternative: 'FM,Federated States of Micronesia,Micronesia, Federated States of',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/49.Nevis.png'),
        name: 'Federation of Saint Christopher and Nevis',
        countryCode2: 'KN',
        countryCode3: 'KNA',
        nativeName: '',
        alternative: 'KN,Federation of Saint Christopher and Nevis',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/50.Brazil.png'),
        name: 'Federative Republic of Brazil',
        countryCode2: 'BR',
        countryCode3: 'BRA',
        nativeName: '',
        alternative: 'BR,Brasil,Federative Republic of Brazil,República Federativa do Brasil',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/51.French-Polynesiay.png'),
        name: 'French Polynesia',
        countryCode2: 'PF',
        countryCode3: 'PYF',
        nativeName: '',
        alternative: 'PF,Polynésie française,French Polynesia,Pōrīnetia Farāni',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/52.French-Republic.png'),
        name: 'French Republic',
        countryCode2: 'FR',
        countryCode3: 'FRA',
        nativeName: '',
        alternative: 'FR,French Republic,République française',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/53.Gabonese-Republic.png'),
        name: 'Gabonese Republic',
        countryCode2: 'GA',
        countryCode3: 'GAB',
        nativeName: '',
        alternative: 'GA,Gabonese Republic,République Gabonaise',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/54.Georgia.png'),
        name: 'Georgia				',
        countryCode2: 'GE',
        countryCode3: 'GEO',
        nativeName: '',
        alternative: 'GE,Sakartvelo',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/55.Gibraltar.png'),
        name: 'Gibraltar				',
        countryCode2: 'GI',
        countryCode3: 'GIB',
        nativeName: '',
        alternative: 'GI',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/56.Luxembourg.png'),
        name: 'Grand Duchy of Luxembourg',
        countryCode2: 'LU',
        countryCode3: 'LUX',
        nativeName: '',
        alternative: 'LU,Grand Duchy of Luxembourg,Grand-Duché de Luxembourg,Großherzogtum Luxemburg,Groussherzogtum Lëtzebuerg	',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/57.Greenland.png'),
        name: 'Greenland',
        countryCode2: 'GL',
        countryCode3: 'GRL',
        nativeName: '',
        alternative: 'GL,Grønland',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/58.Grenada.png'),
        name: 'Grenada',
        countryCode2: 'GD',
        countryCode3: 'GRD',
        nativeName: '',
        alternative: 'GD',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/59.Guadeloupe.png'),
        name: 'Guadeloupe',
        countryCode2: 'GP',
        countryCode3: 'GLP',
        nativeName: '',
        alternative: 'GP,Gwadloup',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/60.Guam.png'),
        name: 'Guam',
        countryCode2: 'GU',
        countryCode3: 'GUM',
        nativeName: '',
        alternative: 'GU,Guåhån',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/61.Guiana.png'),
        name: 'Guiana',
        countryCode2: 'GF',
        countryCode3: 'GUF',
        nativeName: '',
        alternative: 'GF,Guiana,Guyane',
        countryCalling: '+5'
      },
      {
        image: require('@/assets/flag/62.Jordan.png'),
        name: 'Hashemite Kingdom of Jordan',
        countryCode2: 'JO',
        countryCode3: 'JOR',
        nativeName: '',
        alternative: 'JO,Hashemite Kingdom of Jordan,al-Mamlakah al-Urdunīyah al-Hāshimīyah',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/63.McDonald-Islands.png'),
        name: 'Heard Island and McDonald Islands',
        countryCode2: 'HM',
        countryCode3: 'HMD',
        nativeName: '',
        alternative: 'HM,Heard Island and McDonald Islands',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/64.Hellenic-Republic.png'),
        name: 'Hellenic Republic',
        countryCode2: 'GR',
        countryCode3: 'GRC',
        nativeName: '',
        alternative: 'GR,Elláda,Hellenic Republic,Ελληνική Δημοκρατία',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/65.Hong-Kong.png'),
        name: "Hong Kong Special Administrative Region of the People's Republic of China",
        countryCode2: 'HK',
        countryCode3: 'HKG',
        nativeName: '中华人民共和国香港特别行政区',
        alternative: 'HK',
        countryCalling: '+8'
      },
      {
        image: require('@/assets/flag/66.Hungary.png'),
        name: 'Hungary				',
        countryCode2: 'HU ',
        countryCode3: 'HUN',
        nativeName: '',
        alternative: 'HU',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/67.Iceland.png'),
        name: 'Iceland',
        countryCode2: 'IS',
        countryCode3: 'ISL',
        nativeName: '',
        alternative: 'IS,Island,Republic of Iceland,Lýðveldið Ísland',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/68.Kiribati.png'),
        name: 'Independent and Sovereign Republic of Kiribati',
        countryCode2: 'KI',
        countryCode3: 'KIR',
        nativeName: '',
        alternative: 'KI,Republic of Kiribati,Ribaberiki Kiribati',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/69.Guinea.png'),
        name: 'Independent State of Papua New Guinea',
        countryCode2: 'PG',
        countryCode3: 'PNG',
        nativeName: '',
        alternative: 'PG,Independent State of Papua New Guinea,Independen Stet bilong Papua Niugini',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/70.Samoa.png'),
        name: 'Independent State of Samoa',
        countryCode2: 'WS',
        countryCode3: 'WSM',
        nativeName: '',
        alternative: 'WS,Independent State of Samoa,Malo Saʻoloto Tutoʻatasi o Sāmoa',
        countryCalling: '+6'
      },
      {
        image: require('@/assets/flag/71.Islamic.png'),
        name: 'Islamic Republic of Afghanistan',
        countryCode2: 'AF',
        countryCode3: 'AFG',
        nativeName: '',
        alternative: 'AF,Afġānistān',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/72.Iran.png'),
        name: 'Islamic Republic of Iran',
        countryCode2: 'IR',
        countryCode3: 'IRN',
        nativeName: '',
        alternative: 'IR,Islamic Republic of Iran,Iran, Islamic Republic of,Jomhuri-ye Eslāmi-ye Irān',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/73.Islamic-Republic-of-Mauritania.png'),
        name: 'Islamic Republic of Mauritania',
        countryCode2: 'MR',
        countryCode3: 'MRT',
        nativeName: '',
        alternative: 'MR,Islamic Republic of Mauritania,al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/74.Pakistan.png'),
        name: 'Islamic Republic of Pakistan',
        countryCode2: 'PK',
        countryCode3: 'PAK',
        nativeName: '',
        alternative: "PK,Pākistān,Islamic Republic of Pakistan,Islāmī Jumhūriya'eh Pākistān",
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/75.Isle-of-Man.png'),
        name: 'Isle of Man',
        countryCode2: 'IM',
        countryCode3: 'IMN',
        nativeName: '',
        alternative: 'IM,Ellan Vannin,Mann,Mannin',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/76.Italian-Republic.png'),
        name: 'Italian Republic',
        countryCode2: 'IT',
        countryCode3: 'ITA',
        nativeName: '',
        alternative: 'IT,Italian Republic,Repubblica italiana',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/77.Jamaica.png'),
        name: 'Jamaica',
        countryCode2: 'JM',
        countryCode3: 'JAM',
        nativeName: '',
        alternative: 'JM',
        countryCalling: '+1'
      },
      {
        image: require('@/assets/flag/78.Japan.png'),
        name: 'Japan				',
        countryCode2: 'JP',
        countryCode3: 'JPN',
        nativeName: '',
        alternative: 'JP,Nippon,Nihon',
        countryCalling: '+8'
      },
      {
        image: require('@/assets/flag/79.Kingdom-of-Bahrain.png'),
        name: 'Kingdom of Bahrain',
        countryCode2: 'BH',
        countryCode3: 'BHR',
        nativeName: '',
        alternative: 'BH,Kingdom of Bahrain,Mamlakat al-Baḥrayn',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/80.Kingdom-of-Belgium.png'),
        name: 'Kingdom of Belgium',
        countryCode2: 'BE',
        countryCode3: 'BEL',
        nativeName: '',
        alternative: 'BE,België,Belgie,Belgien,Belgique,Kingdom of Belgium,Koninkrijk België,Royaume de Belgique,Königreich Belgien',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/81.Kingdom-of-Bhutan.png'),
        name: 'Kingdom of Bhutan',
        countryCode2: 'BT',
        countryCode3: 'BTN',
        nativeName: '',
        alternative: 'BT,Kingdom of Bhutan',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/82.Kingdom-of-Cambodia.png'),
        name: 'Kingdom of Cambodia',
        countryCode2: 'KH',
        countryCode3: 'KHM',
        nativeName: '',
        alternative: 'KH,Kingdom of Cambodia',
        countryCalling: '+8'
      },
      {
        image: require('@/assets/flag/83.Denmark.png'),
        name: 'Kingdom of Denmark',
        countryCode2: 'DK',
        countryCode3: 'DNK',
        nativeName: '',
        alternative: 'DK,Danmark,Kingdom of Denmark,Kongeriget Danmark',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/84.Eswatini.png'),
        name: 'Kingdom of Eswatini',
        countryCode2: 'SZ',
        countryCode3: 'SWZ',
        nativeName: '',
        alternative: 'SZ,Swaziland,weSwatini,Swatini,Ngwane,Kingdom of Eswatini,Umbuso weSwatini',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/85.Lesotho.png'),
        name: 'Kingdom of Lesotho				',
        countryCode2: 'LS',
        countryCode3: 'LSO',
        nativeName: '',
        alternative: 'LS,Kingdom of Lesotho,Muso oa Lesotho',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/86.Morocco.png'),
        name: 'Kingdom of Morocco',
        countryCode2: 'MA',
        countryCode3: 'MAR',
        nativeName: '',
        alternative: 'MA,Kingdom of Morocco,Al-Mamlakah al-Maġribiyah',
        countryCalling: '+2'
      },
      {
        image: require('@/assets/flag/87.Norway.png'),
        name: 'Kingdom of Norway',
        countryCode2: 'NO',
        countryCode3: 'NOR',
        nativeName: '',
        alternative: 'NO,Norge,Noreg,Kingdom of Norway,Kongeriket Norge,Kongeriket Noreg',
        countryCalling: '+4'
      },
      {
        image: require('@/assets/flag/88.Arabia.png'),
        name: 'Kingdom of Saudi Arabia',
        countryCode2: 'SA',
        countryCode3: 'SAU',
        nativeName: '',
        alternative: 'Saudi,SA,Kingdom of Saudi Arabia,Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah',
        countryCalling: '+9'
      },
      {
        image: require('@/assets/flag/89.Spain.png'),
        name: 'Kingdom of Spain',
        countryCode2: 'ES',
        countryCode3: 'ESP',
        nativeName: '',
        alternative: 'ES,Kingdom of Spain,Reino de España',
        countryCalling: '+3'
      },
      {
        image: require('@/assets/flag/90.Sweden.png'),
        name: 'Kingdom of Sweden',
        countryCode2: 'SE',
        countryCode3: 'SWE',
        nativeName: '',
        alternative: 'SE,Kingdom of Sweden,Konungariket Sverige',
        countryCalling: '+4'
      }
    ];
    const search = ref('');
    const filterTableData = computed(() => tableData.filter(data => data.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1));
    return {
        search,
        filterTableData,
    }
  },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    padding: 20px 20px 0 20px;
    position: relative;
    border: 1px solid #ccc;
    border-bottom: 0;
}
.profile{
    display: flex;
    justify-content: left;
}
.profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}
.name{
    display: flex;
    align-items: center;
}
.search {
    position: absolute;
    right: 20px;
    top: 25px;
}
.search-txt{
    width: 210px;
    padding: 10px 10px;
}
.main-containt{
  padding: 0 20px 20px 20px;
  border: 1px solid #ccc;
  border-top: 0;
  margin-bottom: 50px;
}
h2{
  margin-bottom: 20px;
}
table{
  background: #f3f3f3;
  border-spacing: 0;
  font-size: 13px;
  text-align: left;
}
th{
  background: #e5e5e5;
  padding: 10px 10px;
  border-right: 1px solid #fff;
}
th:nth-child(7){
  border: 0;
  width: 11%;
}
td{
  padding: 5px 10px;
  border-bottom: 1px solid #fff;
}
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
