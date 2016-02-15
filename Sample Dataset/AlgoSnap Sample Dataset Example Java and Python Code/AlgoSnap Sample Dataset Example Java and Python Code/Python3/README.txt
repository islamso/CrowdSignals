
This software is provided by AlgoSnap Inc. under the MIT License

Utility that converts the AVRO files in the AlgoSnap Inc. sample dataset to comma separated format (for Excel visualization) and/or
compute simple example statistics on the files such as mean, std, min, max, etc.

Instructions:

1. Download the code and place it in a directory in your computer

2. Install Python 3.4.3 or compatible version

3. Install the Python fastavro library.

    installing fastavro (0.9.6) library - reads avro at least 3.5X faster than AVRO site library
    install cython first
    clone the fastavro repo
    >>git clone https://github.com/tebeka/fastavro.git
    >>cd to fastavro
    compile the C extensions
    >>make -f Makefile
    run the installation command
    >>sudo python3 setup.py install
    verify fastavro is installed
    >>pip3 list

4. Run the script

    >>python3 converter.py input_path output_path --csv --stats

    if you have any questions on how to run the code, do
    >> python3 converter.py --help


All the best and remember, contact AlgoSnap Inc. for any of your algorithm development or data collection needs!
    info@algosnap.com