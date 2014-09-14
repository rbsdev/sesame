#!/bin/sh
say () {
   echo $* 
   mplayer -volume 90 "http://api.voicerss.org/?key=50959f3a9fb04e4b9ee978fc291fa362&src=$*&hl=pt-br"
}
fort=$(fortune)
all_say=$(echo  \"$1, bem-vindo ao nucleo digital RBS... $fort\" | sed 'y/áÁàÀãÃâÂéÉêÊíÍóÓõÕôÔúÚçÇ/aAaAaAaAeEeEiIoOoOoOuUcC/') 
echo $all_say
say $all_say
