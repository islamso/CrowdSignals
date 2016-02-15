
This software is provided by AlgoSnap Inc. under the MIT License

This is a utility that converts the AVRO files in the CrowdSignals sample dataset 
to comma separated format (for Excel visualization) or to JSON.

Instructions:

1. Download the code and place it in a directory in your computer

2. Install the latest version of Java

3. Run the executable jar to convert a file or files from AVRO to CSV or JSON:

    >> java -jar CSDataUtil.jar -csv myfile.log
    or
    >> java -jar CSDataUtil.jar -json myfile.log

    If you have any questions on how to run the code, use
    >> java -jar CSDataUtil.jar --help

Note that gzipped files will be automatically unzipped, and if directories are listed 
in the command line then all files in those directories will be processed.


All the best and please contact us with info@algosnap.com for any algorithm development or data collection needs!