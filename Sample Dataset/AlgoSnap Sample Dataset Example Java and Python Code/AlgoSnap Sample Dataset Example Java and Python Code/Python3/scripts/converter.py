"""
---------------------------------------------------------------------------------------------------------------------------------
The MIT License (MIT)
Copyright (c) 2015 AlgoSnap Inc.

All the best and remember, contact AlgoSnap Inc. for any of your algorithm development or data collection needs!
    info@algosnap.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
---------------------------------------------------------------------------------------------------------------------------------
"""

__author__ = 'root'

import argparse
import os
from fastavro import reader
import gzip
from io import BytesIO
from statistics import mean, variance
from datetime import tzinfo, timedelta, datetime

#AVRO additional metadata to compute statistics over specific variables
AVRO_METADATA = { 'accelerometer':{'vars':["timestamps","x","y","z"]}, \

                          'light':{'vars':["timestamps","lux"]}, \

                  'ambienttemperature':{'vars':["timestamps","ambienttemp"]}, \

                  'battery':{'vars':["timestamps","level"]}, \

                 'connectionstrength':{'vars':["timestamps","strength"]}, \

                  'humidity':{'vars':["timestamps","humidity"]}, \

                 'pressure':{'vars':["timestamps","pressure"]}, \

                 'proximity':{'vars':["timestamps","distance"]}, \

                  'magnetometer':{ 'vars':["timestamps","x","y","z"]}, \

                      'gyroscope':{'vars':["timestamps","x","y","z"]}, \

                     'apps':{'vars':["timestamps","running_activities","num_activities"]}, \

                     'screen':{'vars':["timestamps","status"]}, \

                    'phonestate':{'vars':["timestamps","data"]}, \

                    'smsContent':{'vars':["timestamps","num_words"]}, \

                   'location':{'vars':["timestamps","latitude", "longitude", "speed"]}, \

                   'bluetooth':{'vars':["timestamps","name", "address", "rssi"]}, \

                   'gsm':{'vars':["timestamps", "cid", "lac", "mcc", "mnc"]}, \

                   'heartrate':{'vars':["timestamps", "rate"]}, \

                   'connectivity':{'vars':["timestamps", "connected", "connecting", "available", "network_type", "roaming", "ssid"]}, \

                    'wlan':{'vars':["timestamps", "ssid", "bssid", "frequency", "level"]}, \

                    'sms':{'vars':["timestamps", "content_length", "num_words", "address", "msg_type", "event_type"]}, \

                    'interval_label':{'vars':["label","label_start", "label_end"]}, \

                    'callcontent':{'vars':["timestamps","duration"]} }


def unzip_buffer(buffer):
    """
    decompresses a memory buffer stored in GZip format.

    :param buffer: binary memory object containing the data in GZip format.
    :return: the decompressed binary data
    """
    zfile = gzip.GzipFile(mode='rb', fileobj=BytesIO(buffer))
    ret = zfile.read()
    zfile.close()
    return ret



def read_fastavro_original_from_buffer(bufferbytes):
    """
    Reads the AVRO binary data contained in the specified bytes buffer and returns it as a python data structure.
    The avro buffer to read must contain schema, headers, and the binary representation of the data. This is basically
    what is written by default by DataFileWriter

    :param bufferbytes: the buffer of bytes containing original binary AVRO representation
    :return: recs  : python list containing all avro recs
             schema: the avro schema object
    """

    bytes_reader = BytesIO(bufferbytes)
    freader = reader(bytes_reader)
    schema = freader.schema
    recs = []
    for datum in freader:
        recs.append(datum)
    return recs, schema



class FixedOffset(tzinfo):
    """
    Fixed time offset to use for time conversion from Unixtime to DateTime Python object
    """

    def __init__(self, name, hours_offset):
        self.__offset = timedelta(hours = hours_offset)
        self.__name = name

    def utcoffset(self, dt):
        return self.__offset

    def tzname(self, dt):
        return self.__name

    def dst(self, dt):
        return timedelta(0)


def unix_to_datetime(unix_time, hours_offset,  time_zone='UTC'):
    """
    EMTAPIA: Use this function as it is the most generic one!
    converts a unix timestamp to datetime object taking into account the specified timezone
    if time_zone is none, the local timezone is used to generate the datetime object
    :param unix_time: this is the unix time to convert in nanoseconds
    :param time_zone: user provide name for this custom timezone (e.g. 'new_timezone')
    :param hours_offset: the hours offset for the timezone (e.g. -5 for Bay Area winter time)
    :return: a DateTime UTC object containing the converted date/time
    """
    temp = None
    if time_zone is None:
        temp = datetime.fromtimestamp(unix_time/1000000000)
    else:
        tz = FixedOffset(time_zone, hours_offset)
        temp = datetime.fromtimestamp(unix_time/1000000000, tz)
    return temp


def avro_to_csv(avro, filepath):
    """
    converts the AVRO records to a comma separated format and writes it to the specified file.

    The CSV format looks like this:
    timestamp, value1, value2, ... ,valuen

    values are in the order specified by variables in the AVRO_METADATA object

    :param avro: the list of recs in AVRO format
    :param filepath: the path to the output file
    :return:
    """

    #ignore audio, as it is not being released in sample dataset for now...
    if 'microphone' == avro[0]['type']:
        return

    variables = AVRO_METADATA[avro[0]['type']]['vars']

    file = open(filepath, "w")
    file.write("sensor_type, device_type, ")
    for var in variables:
        file.write(var + ", ")
        if var == 'label_start':
            file.write("label_start_datetime,")
        if var == 'label_end':
            file.write("label_end_datetime,")
    file.write("\n")

    #for all recs
    for rec in avro:
        if "timestamps" in rec:
            total = len(rec["timestamps"])
        else:
            total = len(rec["label"])
        for i in range(0, total):
            file.write(rec["type"] + ",")
            file.write(rec["device_type"] + ",")
            for v in range(0, len(variables)):
                if variables[v] == 'timestamps':
                    file.write(str(rec[variables[v]][i]))
                else:
                    if type(rec[variables[v]][i]) is str:
                        file.write(rec[variables[v]][i])
                    else:
                        file.write('{0:.3f}'.format(rec[variables[v]][i]))
                        if variables[v] == 'label_start' or variables[v] == 'label_end':
                            time = unix_to_datetime(rec[variables[v]][i], -8)
                            file.write(time.strftime(',%d/%m/%Y %H:%M:%S'))
                if v != len(variables)-1:
                    file.write(",")
            file.write("\n")

    file.close()




def avro_stats_for_type(avro, filepath):

    """
    Computes simple statistics (min, max, mean, std) as well as number of full and empty records found over the specified
    AVRO files and writes the results to the specified output file.

    :param avro: object containing the AVRO records
    :param filepath: the path to the output file
    :return:
    """

    #ignore audio, as it is not being released in sample dataset for now...
    if 'microphone' == avro[0]['type'] or 'interval_label' == avro[0]['type']:
        return

    variables = AVRO_METADATA[avro[0]['type']]['vars']

    total_recs = 0
    total_full = 0
    first_var = True

    data = []

    #for all variables specified
    for v in variables:

        #do not compute stats on timestamps
        if v == 'timestamps':
            continue

        #compute stats
        values = []

        #for all recs
        for rec in avro:

            #count records including empty ones (if any)
            #note: empty records are not observed in any datasets collected
            #but including here as a check for quality control.
            if first_var:
                total_recs = total_recs + 1
                if rec["timestamps"]:
                    total_full = total_full + 1

            #if list is empty
            if not rec[v]:
                continue

            values.extend(rec[v])


        #if there are any values found
        if values:

            #computing stats
            stats_computed = []

            #if it is not a string
            if type(values[0]) != str:
                meanv = mean(values)
                if len(values) > 1:
                    varv = variance(values)
                    minv = min(values)
                    maxv = max(values)
                else:
                    varv = values[0]
                    minv = values[0]
                    maxv = values[0]
                stats_computed = [{'title':'Mean', 'value':meanv}, {'title':'Variance', 'value':varv}, \
                                      {'title':'Min', 'value':minv}, {'title':'Max', 'value':maxv}]
            #else if it is a string
            else:
                #compute a histogram of values
                counts_hash = {}
                for v in values:
                    if v in counts_hash:
                        counts_hash[v] = counts_hash[v] + 1
                    else:
                        counts_hash[v] = 1

                stats_computed = [{'title':'Different Values', 'value':len(counts_hash)}]
                i = 0
                for key in counts_hash:
                    if i < 4:
                        stats_computed.append({'title':key+ " count", 'value':counts_hash[key]})
                    else:
                        break
                    i = i+1

        #if all is empty
        else:
            stats_computed = [{'title':'All Records Empty', 'value':total_recs}]

        data.append (dict(variable=v, measures=stats_computed))
        first_var = False


    total_empty = total_recs - total_full
    stats = dict(type=avro[0]['type'], device_type=avro[0]['device_type'], total_recs=total_recs, total_empty=total_empty, total_full=total_full, data=data)

    #writing resulting statistics
    file = open(filepath, "w")
    file.write("sensor_type, " + stats['type'] + "\n")
    file.write("device_type, " + stats['device_type'] + "\n")
    file.write("total_empty_records, " + str(stats['total_empty']) + "\n")
    file.write("total_full_records, " + str(stats['total_full']) + "\n")
    file.write("total_records, " + str(stats['total_recs']) + "\n")
    for data in stats['data']:
        file.write("variable, " + data['variable'] + "\n")
        for measure in data['measures']:
            file.write("\t" + measure['title'] + ", ")
            file.write(str(measure['value']) + "\n")

    file.write("\n")





def main():

    parser = argparse.ArgumentParser(description='Utility that converts the AVRO files in the sample dataset to comma separated format (for Excel visualization) and/or compute simple example statistics on the files such as mean, std, min, max, etc. ')

    parser.add_argument('input_dir', metavar='input_dir', type=str,
                   help='The input directory where the AVRO sample dataset files are located.')

    parser.add_argument('output_dir', metavar='output_dir', type=str,
                   help='The output directory where the CSV files and/or statistics will be created.')

    parser.add_argument('-csv', '--csv', dest='csv', action='store_true', default=True,
                        help='convert AVRO files to CSV files')

    parser.add_argument('-stats', '--stats',dest='stats', action='store_true', default=False,
                        help='compute simple statistics on AVRO files')

    args = parser.parse_args()

    try:

        print ("Starting Conversions...")

        fnames = os.listdir(args.input_dir)

        #ordering files according to creation time
        fnames.sort(key=lambda fn: os.path.getmtime(os.path.join(args.input_dir, fn)))

        for fname in fnames:

            if not fname.endswith('.gz'):
                continue

            with open(os.path.join(args.input_dir, fname), 'rb') as f:

                print ("converting %s" %fname)
                data = unzip_buffer(f.read())
                avro_recs, schema = read_fastavro_original_from_buffer(data)

                #if convert to csv
                if args.csv:
                    filepath = os.path.join(args.output_dir, fname.split('.')[0] + '.csv')
                    avro_to_csv(avro_recs, filepath)

                if args.stats:
                    filepath = os.path.join(args.output_dir, fname.split('.')[0] + '_statistics.txt')
                    avro_stats_for_type(avro_recs, filepath)


    except Exception as e:
        print ("Failed to perform conversion %s" % (e))
        raise e

    print ("completed!")



if __name__ == "__main__":
    main()

