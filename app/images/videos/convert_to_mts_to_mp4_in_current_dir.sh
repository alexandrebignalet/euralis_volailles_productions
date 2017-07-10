DIR=$(ls)
EXT=".mpg"

for entry in $DIR
do
	if [[ $entry  == *.mpg ]]
	then	
		FILENAME=${entry%$EXT}
		
		if ! [ -d "./mp4" ]
		then
			echo "no dir mp4"
			mkdir mp4
		fi
		
		~/bin/ffmpeg -i $entry "./mp4/$FILENAME.mp4" 		
	fi
done
