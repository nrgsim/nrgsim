{

	"notes" : "Some notes about this RVX",

	"rvis" : [ 
		{ 
			"fileName" : "null.rvi",
			"tableName" : "SimResults"
		}
	],
	
	"sqls" : [
		{ 
			"tableName" : "TotalEnergy",
			"columnHeaders" : "Total Energy [kWh]",
			"sqlcommand" : "SELECT Value FROM TabularDataWithStrings WHERE (ReportName= 'AnnualBuildingUtilityPerformanceSummary' AND TableName='Site and Source Energy' AND RowName= 'Total Site Energy' AND ColumnName= 'Total Energy')"
		},
		{ 
			"tableName" : "IdealHeatingEnergy",
			"columnHeaders" : "Ideal Heating Energy [kWh]",
			"sqlcommand" : "SELECT Value FROM TabularDataWithStrings WHERE (ReportName= 'AnnualBuildingUtilityPerformanceSummary' AND TableName ='End Uses' AND RowName ='Heating' AND ColumnName = 'District Heating')"
		},
		{ 
			"tableName" : "IdealCoolingEnergy",
			"columnHeaders" : "Ideal Cooling Energy [kWh]",
			"sqlcommand" : "SELECT Value FROM TabularDataWithStrings WHERE (ReportName= 'AnnualBuildingUtilityPerformanceSummary' AND TableName ='End Uses' AND RowName ='Cooling' AND ColumnName = 'District Cooling')"
		},
		{ 
			"tableName" : "TotalCoolingLoad",
			"columnHeaders" : "Calculated Design Cooling Load [W]",
			"sqlcommand" : "SELECT SUM(DesLoad) FROM ZoneSizes WHERE LoadType='Cooling'"
		},
		{ 
			"tableName" : "TotalHeatingLoad",
			"columnHeaders" : "Calculated Design Heating Load [W]",
			"sqlcommand" : "SELECT SUM(DesLoad) FROM ZoneSizes WHERE LoadType='Heating'"
		},
		{ 
			"tableName" : "AdaptiveComfortReport",
			"columnHeaders" : "Time Outside ASHRAE55 80% Acceptability Limits []",
			"sqlcommand" : "SELECT SUM (Value) FROM TabularDataWithStrings WHERE (ReportName= 'AdaptiveComfortReport' AND TableName ='People Summary' AND ColumnName= 'ASHRAE55 80% Acceptability Limits')"
		},
		{ 
			"tableName" : "ConsCost",
			"columnHeaders" : "Construction Cost [$]",
			"sqlcommand" : "Select Value from TabularDataWithStrings WHERE (RowName ='Line Item SubTotal' AND ColumnName = 'SubTotal ~~$~~')"
		}
	],
	
	"userVars" : [
		{
			"identifier" : "v1",
			"formula" : "c1",
			"caption" : "Heating Energy Demand [kWh]",
			"report" : true
		},
		{
			"identifier" : "v2",
			"formula" : "c2",
			"caption" : "Cooling Energy Demand [kWh]",
			"report" : true
		},
		{
			"identifier" : "v3",
			"formula" : "c1*0.60",
			"caption" : "Heating Energy [kWh]",
			"report" : true
		},
		{
			"identifier" : "v4",
			"formula" : "c2*0.76",
			"caption" : "Cooling Energy [kWh]",
			"report" : true
		}
	],
	
	"constraints" : [
		{
			"identifier" : "s1",
			"formula" : "v1/1000",
			"caption" : "This is an example [kW]",
			"scaling" : true,
			"lb" : 0,
			"ub" : 200,
			"min" : 0,
			"max" : 300,
			"weight" : 1.0
		}
	],

	"objectives" : [
		{
			"identifier" : "t1",
			"formula" : "v3+v4",
			"caption" : "HVAC Energy [kWh]",
			"scaling" : false,
			"min" : 0,
			"max" : 100000,
			"weight" : 1.0
		},
		{
			"identifier" : "t2",
			"formula" : "c3/1000",
			"caption" : "Cooling Load [kW]",
			"scaling" : false,
			"min" : 0,
			"max" : 100000,
			"weight" : 1.0
		},
		{
			"identifier" : "t3",
			"formula" : "c4/1000",
			"caption" : "Heating Load [kW]",
			"scaling" : false,
			"min" : 0,
			"max" : 100000,
			"weight" : 1.0
		},
		{
			"identifier" : "t4",
			"formula" : "c5",
			"caption" : "Discomfort Hours [hr]",
			"scaling" : false,
			"min" : 0,
			"max" : 100000,
			"weight" : 1.0
		},
		{
			"identifier" : "t5",
			"formula" : "c6",
			"caption" : "Construction Cost [$]",
			"scaling" : false,
			"min" : 0,
			"max" : 100000,
			"weight" : 1.0
		}
	]
}
