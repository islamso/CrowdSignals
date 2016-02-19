package com.algosnap.crowdsignals.data;

import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;

import org.apache.avro.Schema;
import org.apache.avro.Schema.Field;
import org.apache.avro.file.DataFileReader;
import org.apache.avro.generic.GenericArray;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumReader;

/**
 * 
 * ---------------------------------------------------------------------------------------------------------------------------------
 * The MIT License (MIT)
 * Copyright (c) <year> <copyright holders>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ---------------------------------------------------------------------------------------------------------------------------------
 * 
 * All the best from AlgoSnap!
 * Contact us for your algorithm development or data collection needs: founders@algosnap.com
 * 
 */
public class SampleAvroCode {
    
    
    /**
     * Load binary Avro accelerometer data from file into memory and access records. 
     * @param args
     */
    public static void main(String[] args) {
        
        String accelFile = "data/Accelerometer-sample.log";
        try {
            processAccelerometer(accelFile);
        } catch(IOException e){
            e.printStackTrace();
        }
    }
    
    
    /**
     * Load accelerometer records from the named file and compute the magnitude for 
     * each x,y,z triple in each record.
     * @param filename
     * @throws IOException
     */
    public static void processAccelerometer(String filename) throws IOException {
        File stream = new File(filename);
        
        if(stream.exists()){
            DatumReader<GenericRecord>    datumReader  = new GenericDatumReader<GenericRecord>();
            DataFileReader<GenericRecord> streamReader = new DataFileReader<GenericRecord>(stream,datumReader);
            Schema                        schema       = streamReader.getSchema();
            String                        schemaName   = schema.getName();
            
            // Step through the schema programmatically
            System.out.println("Schema " + schemaName + " with fields:");
            List<Field> fields = schema.getFields();
            for(Field f : fields){
                String      name = f.name();
                Schema      fs   = f.schema();
                Schema.Type t    = fs.getType();
                
                if(Schema.Type.ARRAY == t){
                    Schema.Type et       = fs.getElementType().getType();
                    String      aTypeStr = getTypeString(et);
                    System.out.println("\t- " + name + " (array of " + aTypeStr + ")");
                } else {
                    String typeStr = getTypeString(t);
                    System.out.println("\t- " + name + " (" + typeStr + ")");
                }
            }
            
            // We're only expecting accelerometer records in this example
            if(schemaName.equalsIgnoreCase("accelerometer")){
                
                // Step through each record and compute magnitude
                boolean moreRecs = streamReader.hasNext();
                while(moreRecs){
                    StringBuilder sb  = new StringBuilder();
                    GenericRecord rec = streamReader.next();                    
                    
                    long startPane = (Long)rec.get("start");
                    long endPane   = (Long)rec.get("end");
                    sb.append("Magnitudes for pane ");
                    sb.append(startPane);
                    sb.append(" - ");
                    sb.append(endPane);
                    sb.append("\n");
                    
                    GenericArray<Float> x = (GenericArray<Float>)rec.get("x");
                    GenericArray<Float> y = (GenericArray<Float>)rec.get("y");
                    GenericArray<Float> z = (GenericArray<Float>)rec.get("z");
                    
                    sb.append(x.size());
                    sb.append(" records:\n[");
                    
                    // Note: Timeseries arrays generated by the CrowdSignals app 
                    // are always exactly the same size, so we can use x.size() for all
                    NumberFormat formatter = new DecimalFormat("#0.00"); 
                    for(int i=0; i<x.size(); i++){
                        float  xVal = x.get(i);
                        float  yVal = y.get(i);
                        float  zVal = z.get(i);
                        double mag  = xVal*xVal + yVal*yVal + zVal*zVal;
                        mag         = Math.sqrt((double)mag);
                        sb.append(formatter.format(mag));
                        if(i < x.size()-1){
                            sb.append(",");
                            if(i>0 && i%20 == 0){
                                sb.append("\n ");
                            }
                        } else {
                            sb.append("]");
                        }
                    }
                    sb.append("\n\n");
                    System.out.println(sb.toString());
                    moreRecs = streamReader.hasNext();
                }
            }
        }
    }
    
    
    /**
     * Gets a String representing the given schema type.
     * @param t
     * @return
     */
    public static String getTypeString(Schema.Type t){
        String type = null;
        
        if(t == Schema.Type.BOOLEAN){
            type = "boolean";
        } else if(t == Schema.Type.INT){
            type = "integer";
        } else if(t == Schema.Type.LONG){
            type = "long";
        } else if(t == Schema.Type.FLOAT){
            type = "float";
        } else if(t == Schema.Type.DOUBLE){
            type = "double";
        } else if(t == Schema.Type.STRING){
            type = "string";
        } else if(t == Schema.Type.ARRAY){
            type = "array";
        } else if(t == Schema.Type.MAP){
            type = "map";
        }
        
        return type;
    }
    
}
