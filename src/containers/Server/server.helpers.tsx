import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  VKShareButton,
  VKIcon,
} from "react-share";
import { GameType, ServerType } from "../../components/GameTableData/GameTableData.types";
import Rating from "../../components/Rating";
import { countries } from "../../utils/countries";
import moment from '../../utils/moment';
import Link from "../../components/mui/Link";
import IPAddress from "../../components/ServersTable/IPAddress";

export const shareButtons = [
  {
    button: EmailShareButton,
    icon: EmailIcon,
  },
  {
    button: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    button: TelegramShareButton,
    icon: TelegramIcon,
  },
  {
    button: TwitterShareButton,
    icon: TwitterIcon,
  },
  {
    button: ViberShareButton,
    icon: ViberIcon,
  },
  {
    button: VKShareButton,
    icon: VKIcon,
  },
]

export function generalInfo(server: ServerType & { game: GameType }, lang: string) {
  return [
    {
      label: 'Статус',
      value: <span style={{ color: server.online ? 'green' : 'red' }}>{server.online ? 'Online' : 'Offline'}</span> 
    },
    {
      label: 'Адрес',
      value: <IPAddress host={server.host} port={server.port} bold/>
    },
    {
      label: 'Игра',
      value: <Link href={`/${lang}/${server.game.slug}`} underline="always">{server.game.title}</Link>
    },
    {
      label: 'Онлайн',
      value: <b>{server.players || 0}/{server.maxPlayers || 0}</b>
    },
    {
      label: 'Карта',
      value: <Link href={`/${lang}/search?game=${server.game.slug}&search=${server.map}`} underline="always">{server.map}</Link>
    },
    {
      label: 'Локация',
      value: () => {
        const country = countries.find(country => country.code.toLowerCase() === server.country)
        return country?.label ? country.label : 'None'
      }
    },
    {
      label: 'Обновлен',
      value: moment(server.updatedAt).fromNow(true)
    },
    {
      label: 'Рейтинг',
      value: <b><Rating serverId={server.id} rating={server.rating} /></b>
    },
  ];
}

