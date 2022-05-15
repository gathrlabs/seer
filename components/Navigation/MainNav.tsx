import Link from "next/link"
import { StackIcon, IdCardIcon, ReaderIcon } from '@radix-ui/react-icons';
import Avatar from "../Avatar";
import Image from "next/image";
import { useRouter } from 'next/router';
import { getProviders, useSession, signIn, signOut } from 'next-auth/react'
import { APP_NAME } from '../../lib/utils/constants'
import DropdownButton from "../DropdownButton";


function MainNav() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const optionSelected = (action: Object) => {
    if (action === "signOut") {
      router.push('/auth/login');
      signOut();
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-4 border-b border-slate-700">
      <div className="inline-flex justify-between w-full items-center">
        <div className="font-display text-3xl inline-flex items-center space-x-2">
          <Image width={35} height={35} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAIP0lEQVR4nO2ca4xV1RXHf3dkgBEGOzDMgKiAOI7WR1UgRK1a1ChqJsbamEY/1IqpDTUkVm1pP/iMiU1MGmN9tEkVH0GNr7ZWkxqtTa1WnaqlaRmCoZUgRXkzgwzBwvTDf+3sc++8zvuc0ftPbvbdM3uf9d/7rnP22mutfaCOOuqoo4466qhjTKJSNIEA5gKLgdOATmA20ApMsv9/BmwDPgLWAe8Br1v9S4t5wG3Ah8BAzM864Fbg6Jy5F4qFwG+Ag/iJ2Ao8C9wALAGOBVqARmC8fe8ELgJ+CDyHNNL1Pwi8ACzIcRy54wjgGfyg9wAPA+cADTGu14Bu+0fsWu66TwOzUuBbKnwP6EMD3A3ciZ5xaWE6cBfQazJ6gaUpXr8wTAZW4bXjSeDwDOXNQhro5D2OX4jGHKYCb+I14ts5yr4M2Gmy30UaOqbQDvTgV8pjCuDQgV/h/wW0FcAhFqYgO23AytGIn5khl3bgfePSjR4ppUYD8DIivIZwC8UjmTISh7WI0+8o1wZiEH6MiH4CHBWyzydkb3bMBj5F3G7KWFZsfA34HDgAnB+yzyw0qK6sSAVwIeK2HzgpB3mRUMGvuPdE6NdlfW7LgtQQ+LnJ+zMlu5WvRMQ2Eu1BfSv+2ZQHmoFNJvOKnGSOigrwT0TqOxH7/tb6fZw2qRFwjclcTUm00N2G/0Gb/yjYiN81tKfMazg0AhtM5iU5yRwRzyMyN4zSrhF5S5YBK5GZE3RNbUTOhpuQgyFLm+1Gk/lMhjJCYSqwD62+w2nQRHTbvG3twvr6epBZNC0D3jOB/wH9wFcyuH5oXIEG+4eQ7ScBZyENeJpqn+BrwC3IHzg1daaD8arJ/VYOsobFQ0bi5pj91+EdooelRSokfmKyf5Gz3CqsNhKLYvZ/yvp/mBqj8DjdZH9QgGxA+95+pD1xH/hu6/dUWqQioBlx30s8j3i8TgEchRaITcilHgfvWVmEFvQBm4Em4Mg4F0g6gc5J+d8E1wi6vYrAZitjhReSTmCzlXG1D+Q13kBxz6E+K5tHbDUMkk7gBCv3JbzO88D2hNeIi71WNsXpnHQCnebFEh7ArxP2dzgjRp9DreyNIzDpBO62Mqn9tiZhf4fvxujjdiG7UuIQCTPxWQVlwCZgRsQ+28nXkTEILr2i6IhXu/FYEqHPDBIqQNJbGOQHBO1vi8SpNWUYnG3l3+MKTWMC/2rlOSlcKwqaUIzjDuBPaCXH6t3Idf9NRnZKuAl8Py6JNCbwZSu/kcK1oqAfhSpXA28h1xfIp/gWmpQeRl4cHOffZ8QxFMbhH8SnFcjjDONwfcj2C6z9FuCQrEiFxb2ITFr2XBxMRiHLr4dsvxJxfiAzRhHQgfdqZOE9Dos1hPMKteK9SMdnyigCPkK/6M8K5HB7yHb3IK4vZcglMpxbfj9wYkEc5oZoczLVcZnSIBgMept0Vvi00YDPnij1BLogUxclWOEQhy7gFQbzLA0coaVoa+TqO1BG/TJgPvmk204yWT9ABvaOAJ+txjGVCUwzrcGRqaAEy+uQd6R2lRtAC85aZPR+iga1BdmT/Xj/4s6avi1WTkQ7kVbkFZ+O9sJHAscBcxg8th50IuCX+GR3hmgXCVlNYBCzUarbuSj9rQOd+8gS+1G49B/AH1H8d0NNm1JN4MV4k2C0a45D+dKdKFs/qEEtSLMmWtuWmr5OI52W7sRr8FYUm1kLrEdZByPBTeAl+O1o7mgAHqSkD+VREOT8AAVZDS6muxdt2geAnyItKysa8TmJuxD3AeBHRZBxu4/zgavxeS7/Jp57PWtUkPvNpZIsRdzdwpY7am/bJfhs+L7A369Fi0hemIK/JeegkOlVVu9Ge+aLA+0Le/wMJbgBuADvFZlubd6xerN9dznRFeD7VLvC5lMd6D6O6sDVYnwmwXjgbuRcBR2h3YeSnkDJ5PuRozXKOHJBWMGX4/fHbSia51xfx9s13Eo4D91eLwbqB9DxWJAZFHQE1LY/DPgLMqIdpqQ0jlRRSSB4YuB7hWqDewJaFS+3ehPwBEpiB2n47XiNA510SnKA0Y0jt3zpQ/GnkcaS6TIc3DhewgfaM8WvAkLLENJMgjaqx/LQyM3TwW78wjCALP9LKcmRgZCoIM7rqR5LLhkKQc3rDtRfz0N4CpiPP9cygMYQ1MTMERQ0DliONutv2t8moBdABA/1NVGchs4AHsW/kGIZ3nhejt85FTKBQ6ENbZGc6TEbZXK558sE9H6DYDbVIqqPG7RR7YydRvV+9RR8AGk8sAJ5e0B24y789uwi43u31RvQql/7g5ZmAkET4E4ttaLdwHKrL7T+q6zuYrSPWf0EFLe43+pfRcbwfVY/1dqvtPoiqz9h9bko0cgd/KlYm9HS8Eo1gSOhglzsLiOqGTk6XXpIGzpNeY3V21G2gXsLRxNyjrojshX0PoY5CThBjhPoVuEv0rtZjkBj2j1awzTwpAlbgxyjYx2d+BdkrBqlbSqYERDYjxaHjjwEp4xjEfd+NJYeoidoxkYLMg0OmPADwBvoyFeZtbITcXyDau4rKejQYQdaANyv6D4bUDhzBXAexaTQtiOH6Qrj4s4Iu08/4h777knTsG1GHpIu5Kwc6uDKHrR1Wo+M2M0olLnNyu3IfOlFWvE5/iTAZGQWHYLcU43INmwNlDPRSnw0cnMNlWi0DTlCXkTB/74h2oRGVjuDBvR8WYhsvAXIuM3jCGsQO5CH/G/26UbhzoNpCch7a9WCNGMe2p20Ua1F09C2agrStEa8Fu3Bv1KlF4UtndY6Dd6CNHs9isvUBubrqKOOOuqoo44vDP4PkwxENIQVxR8AAAAASUVORK5CYII=" />
          <div>{APP_NAME}</div>
        </div>
        <div className="inline-flex space-x-2 items-center">
          <div>
            <Link href={'/appointments'}>
              <div className="inline-flex items-center space-x-2 text-slate-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-100 ">
                <StackIcon className="w-6 h-6" />
                <div>Appointments</div>
              </div>
            </Link>
          </div>
          <div>
            <Link href={'/case-files'}>
              <div className="inline-flex items-center space-x-2 text-slate-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-100 ">
                <IdCardIcon className="w-6 h-6" />
                <div>Case Files</div>
              </div>
            </Link>
          </div>
          <div>
            <Link href={'/forms'}>
              <div className="inline-flex items-center space-x-2 text-slate-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-100 ">
                <ReaderIcon className="w-6 h-6" />
                <div>Forms</div>
              </div>
            </Link>
          </div>
          <div>
            <DropdownButton optionSelected={optionSelected} options={[{ 'actionName': 'signOut', 'text': 'Logout' }]} title={'Actions'}>
              <div className="inline-flex items-center space-x-2">
                <Avatar />
                {session ? (<div>
                  {session.user.user.name}
                </div>) : <div></div>}
              </div>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav