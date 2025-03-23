import mongoose from 'mongoose';

const marketGrowthSchema = new mongoose.Schema({
    region: {
        type: String, // Name of the region (e.g., "North America", "Europe")
        required: true
    },
    totalSales: {
        type: Number, // Total sales in that region
        required: true,
        default: 0
    },
    growthPercentage: {
        type: Number, // Percentage growth compared to a previous period
        required: true,
        default: 0
    },
    employeesInvolved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to employees involved in tracking this region
    }],
    reportGeneratedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Admin who generated the report (or could be the employee who is managing this region)
        required: true,
    },
    startDate: {
        type: Date, // Start of the time period for the growth report
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date, // End of the time period for the growth report
        required: true,
    }
}, {
    timestamps: true
});

const MarketGrowth = mongoose.model('MarketGrowth', marketGrowthSchema);
export default MarketGrowth;
