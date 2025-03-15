// list.js
const listData = `
Juegos PC=(Juego) (Windows)=:
  -Alien Shooter "https://gogunlocked.com/alien-shooter-expansions-free-download/"
  -Alien Shooter 2: Reloaded "https://gogunlocked.com/alien-shooter-2-reloaded-free-download/"
  -Call of Duty Black Ops 1 "https://pivigames.blog/call-of-duty-black-ops-zombies-y-multiplayer-online/"
  -Call of Duty Modern Warfare 3 "https://pivigames.blog/call-of-duty-moder-warfare-3-con-multijugador-online/"
  -Clone Drone in the Danger Zone "https://pivigames.blog/clone-drone-in-the-danger-zone-v0-4-1/"
  -Cuphead "https://pivigames.blog/chuphead/"
  -Dragon Ball Fighter Z "https://pivigames.blog/dbf-juego-espanol/"
  -Dragon Ball Sparking ZERO "https://pivigames.blog/dragon-ball-sparking-zero-oferta-25/"
  -Exiled Kingdoms "https://gogunlocked.com/exiled-kingdoms-free-download/"
  -Far Cry 3 "https://pivigames.blog/far-cry-3-incluye-dlcs-en-espanol/"
  -GTA III "https://www.elamigosweb.com/game/gta-iii-grand-theft-auto-3"
  -GTA IV "https://pivigames.blog/grand-theft-auto-iv-episodes-from-liberty/"
  -GTA V "https://pivigames.blog/grand-theft-auto-v-premium-online-edition/"
  -GTA: San Andreas "https://www.blizzboygames.net/gta-san-andreas-pc-full-espanol/"
  -GTA: Vice City "https://www.blizzboygames.net/gta-vice-city-pc-full-espanol/"
  -Half-Life 1 Anthology "https://pivigames.blog/half-life-goty-edition/"
  -Halo Combat Evolved "https://pivigames.blog/halo-combat-evolved-con-multiplayer-online/"
  -Injustice Gods Among Us "https://pivigames.blog/injustice-gods-among-us-ultimate-edition/"
  -Killer Instinct "https://pivigames.blog/killer-instinct/"
  -Left 4 Dead 2 "https://pivigames.blog/left-4-dead2-online-steam-ultima-version/"
  -Mortal Kombat Komplete Edition "https://pivigames.blog/mortal-kombat-9-komplete-edition-online-steam/"
  -Nidhogg 2 "https://pivigames.blog/nidhoog-2/"
  -Naruto Shippuden Ultimate Ninja STORM 3 "https://pivigames.blog/naruto-shippuden-ultimate-ninja-sotrm-3-full-burst-online-steam/"
  -Quake III Arena "https://www.blizzboygames.net/quake-3-arena-pc-full-espanol/"
  -Rayman Legends "https://www.blizzboygames.net/rayman-legends-pc-full-espanol/"
  -Serious Sam HD "https://pivigames.blog/seriuos-sam-hd-the-second-encounter/"
  -Slime Rancher "https://pivigames.blog/slime-rancher-ultima-version-pc-gratis/"
  -Spore "https://pivigames.blog/sopre-complete-pack-incluye-dlcs/"
  -Street Fighter X Tekken "https://pivigames.blog/street-fighter-x-tekken-2/"
  -Super Mario 64 Port "https://sm64coopdx.com/"
  -Super Smash Flash 2 "https://www.supersmashflash.com/play/ssf2/downloads/"
  -The Legend of Zelda Port "https://www.shipofharkinian.com/"
  -Undertale "https://pivigames.blog/undertale-en-espanol/"
Programas PC=(Programa) (Windows)=:
  -Advanced SystemCare (Limpieza) "https://es.taiwebs.com/windows/download-advanced-systemcare-pro-368.html"
  -Autoruns (Registro de Windows) "https://www.google.com/url?q=https://download.sysinternals.com/files/Autoruns.zip&sa=D&source=docs&ust=1741690293775013&usg=AOvVaw3r6f1YvR1doRmskUjrBNyS"
  -BleachBit (Limpieza) "https://es.taiwebs.com/windows/download-bleachbit-1219.html"
  -CCleaner (Limpieza) "https://es.taiwebs.com/windows/download-ccleaner-pro-57.html"
  -HidHide (Ocultar Control) "https://github.com/nefarius/HidHide"
  -IdeapadToolkit (Alternativa a Lenovo Vantage) "https://github.com/reagcz/IdeapadToolkit"
  -IObit Driver Booster (Drivers) "https://es.taiwebs.com/windows/download-iobit-driver-booster-102.html"
  -IObit Unlocker (Desbloquear Archivos) "https://es.taiwebs.com/windows/download-iobit-unlocker-6140.html"
  -LenovoController (Alternativa a Lenovo Vantage) "https://github.com/ViRb3/LenovoController"
  -Mirillis Action! (Grabador de pantalla) "https://es.taiwebs.com/windows/download-mirillis-action-213.html"
  -MPO-GPU-FIX (Optimizador) "https://github.com/RedDot-3ND7355/MPO-GPU-FIX"
  -O&O ShutUp10++ (Desactivar Servicios) "https://www.oo-software.com/en/shutup10"
  -Optimizer (Optimizador) "https://es.taiwebs.com/windows/download-optimizer-5951.html"
  -Patch My PC (Actualizador) "https://es.taiwebs.com/windows/download-patch-my-pc-3748.html"
  -Process Lasso (Optimizador) "https://es.taiwebs.com/windows/download-bitsum-process-lasso-pro-289.html"
  -TeraBox (Almacenamiento en la Nube) "https://www.terabox.com/"
  -XOutput (Emular Control) "https://github.com/csutorasa/XOutput/releases/tag/3.32"
Juegos Android=(Juego) (Android)=:
  -Alien Shooter "https://www.mediafire.com/file/qtxntb41f2tfaib/Alien_Shooter_1.2.5.apk/file"
  -Call of Duty: Black Ops Zombies "https://www.mediafire.com/file/a9cb3i70ft7ms7n/COD_BOZ_1.0.11.zip/file"
  -DownWell "https://www.mediafire.com/file/m5su7db553cwe9k/downwell.apk/file"
  -Exiled Kingdoms "https://apkaward.com/exiled-kingdoms-rpg"
  -Lego DC Mighty Micros "https://www.mediafire.com/file/580k0z0nzmapo91/LEGO+DC+Mighty+Micros+v1.7.1418+-+espacioapk.com.apk/file"
  -Paladog "https://www.mediafire.com/file/1xbi8es1hh3sscx/Paladog_2.2.0.apk/file"
  -Pureya "https://www.mediafire.com/file/7dwqkchjm2gxbl3/Pureya_1.0.15.apk/file"
  -Run & Gun: Banditos "https://www.mediafire.com/file/cu23w1yl9t4qp64/Run_%2526_Gun_BANDITOS_1.3.2.apk/file"
Programas Android=(Programa) (Android)=:
  -CapCut Pro "https://www.mediafire.com/file/wvhjm75wj4cqdoc/CapCut+Pro+v13.9.0_(AndroidApkData.net).apk/file"
  -Filmora (Editor de Video) "https://apkpure.com/es/filmora-movie-video-editor/com.wondershare.filmorago"
  -LuckyPatcher "https://www.mediafire.com/file/rej7uf1t7w48x0u/luckypatcher.apk/file"
Extra:
  -BuscaMinas Web "https://angel06a.github.io/BuscaMinas/" *Jugar*
  -daedalOS (Escritorio Web) "https://dustinbrett.com/" *Utilizar*
  -Flappy Bird Web "https://emupedia.net/emupedia-game-flappy-bird/" *Jugar*
  -Friday Night Funkin Web "https://ninja-muffin24.itch.io/funkin" *Jugar*
  -Jetpack Joyride Web "https://emupedia.net/emupedia-game-jetpack-joyride/" *Jugar*
  -OpenLara Web "https://emupedia.net/emupedia-game-tomb-raider/" *Jugar*
  -Slash FRVR (Fruit Ninja) "https://slash.frvr.com/es/" *Jugar*
  -Subway Surfers Web "https://ubg77.github.io/updatefaqs/subway-surfers-nyc/" *Jugar*
  -Temple Run 2 Web "https://emupedia.net/emupedia-game-temple-run2/" *Jugar*
  -The Binding of Isaac Web "https://emupedia.net/emupedia-game-binding-of-isaac/" *Jugar*
  -UNO Online "https://scuffeduno.online/" *Jugar*
`;
