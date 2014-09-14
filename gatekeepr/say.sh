#!/bin/sh
say () {
   echo $* 
   echo "http://translate.google.com/translate_tts?tl=pt-br&q=$*"; 
   mplayer "http://translate.google.com/translate_tts?tl=pt-br&q=$*"; 
}
fort=$(fortune)
all_say=$(echo  \"$fort\" | sed 'y/áÁàÀãÃâÂéÉêÊíÍóÓõÕôÔúÚçÇ/aAaAaAaAeEeEiIoOoOoOuUcC/') 
echo $all_say
say $all_say
